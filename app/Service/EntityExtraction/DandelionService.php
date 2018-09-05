<?php
/**
 * Created by PhpStorm.
 * User: chris
 * Date: 04.09.18
 * Time: 13:35
 */

namespace App\Service\EntityExtraction;
use App\Entity;
use App\Events\PlaceEntered;
use App\Service\CachingGuzzle;
use App\Type;

class DandelionService {
    /** @var string */
    private $token;
    /** @var CachingGuzzle */
    private $guzzle;

    private $endpoint = 'https://api.dandelion.eu/datatxt/nex/v1';

    private static $typeCache = [];


    public function __construct(CachingGuzzle $guzzle, string $token) {
        $this->token = $token;
        $this->guzzle = $guzzle;
    }

    public function getEntitiesFromUrl($target): array {
        $url = $this->endpoint.'?'.http_build_query([
                'token' => $this->token,
                'include' => 'types',
                'url' => $target
            ]);

        $result = $this->guzzle->getJson($url);
        return $this->extractEntities($result);
    }

    public function getEntitiesFromText(string $text) {
        $result = $this->guzzle->getClient()->post($this->endpoint.'?token='.$this->token, ['form_params' => [
            'text' => $text,
            'include' => 'types',
        ]]);

        $result = \GuzzleHttp\json_decode($result->getBody(), true);
        return $this->extractEntities($result);
    }

    private function extractEntities(array $entities): array {
        $entities = $entities['annotations'] ?? [];
        $result = [];
        foreach($entities as $entity) {
            $result[] = [
                'confidence' => $entity['confidence'],
                'entity' => $this->getOrSaveEntity($entity),
            ];
        }
        return $result;
    }

    private function getOrSaveEntity(array $entry): Entity {
        $entity = Entity::where(['name' => $entry['title']])->first();

        if(!$entity) {
            $isPlace = false;
            $typeIds = [];
            foreach($entry['types'] ?? [] as $type) {
                $wording = $this->typeToInternalWording($type);
                if(!$isPlace && in_array($wording, ['Place', 'Location'], true)) {
                    $isPlace = true;
                }
                $typeIds[] = $this->getTypeObject($wording)->id;
            }
            $entity = new Entity();
            $entity->name = $entry['title'];
            $entity->url = $entry['uri'];

            $entity->save();
            $entity->types()->sync($typeIds);
            if($isPlace) {
                event(new PlaceEntered($entity));
            }
        }
        // TODO: save article entities, conf*100
        return $entity;

    }

    /**
     * @param string $theirs something like http://dbpedia.org/ontology/Agent
     *
     * @return string
     */
    private function typeToInternalWording(string $theirs): string {
        $parts = explode('/',$theirs);
         return array_pop($parts);
    }

    private function getTypeObject(string $name): Type {
        if(isset(self::$typeCache[$name])) {
            return self::$typeCache[$name];
        }
        $type = Type::where(['name' => $name])->first();
        if($type === null) {
            $type = new Type();
            $type->name = $name;
            $type->save();
        }
        self::$typeCache[$name] = $type;
        return self::$typeCache[$name];
    }
}