<?php

namespace App\Http\Controllers;

use App\Article;
use App\Entity;
use App\Location;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ApiController extends Controller
{
    public function geoNews(Request $request) {
        $latitude = $request->get('latitude');
        $longitude = $request->get('longitude');
        $maxDistanceInMeters= (int)$request->get('distance', 2000);
        // TODO: max distance?
        if(!isset($latitude, $longitude)) {
            // TODO: handle json errors
            throw new BadRequestHttpException('longitude and latitude need to be defined');
        }

        $point = new Point(
            (float)$latitude,
            (float)$longitude
        );

        $locations = $this->findCloseLocations($maxDistanceInMeters, $point);

        $entityIds = array_keys($locations);
        $entities = $this->findEntities($entityIds);
        $articles = $this->findArticlesWithEntities($entityIds);

        $result = [];
        foreach($articles as $article) {
            $locationData = [
                'geo' => $locations[$article->entity_id]->geo,
                'entity' => $this->serializeEntity($entities[$article->entity_id]),
                'confidence' => $article->confidence
            ];
            if(isset($result[$article->id])) {
                $result[$article->id]['locations'][] = $locationData;
                continue;
            }
            $data = [
                'title' => $article->title,
                'id' => $article->id,
                'locations' => [
                    $locationData
                ],
                'source' => $article->source->toArray(),
                'image' => $article->image,
                'url' => $article->url,
                'createdAt' => $article->created_at->toAtomString(),
                'description' => $article->description,
            ];

            $result[$article->id] = $data;
        }
        return new JsonResponse(array_values($result));
    }

    /**
     * @param int   $maxDistanceInMeters
     * @param Point $point
     * @param int   $maxScale
     *
     * @return Location[] with key entity_id
     */
    private function findCloseLocations(int $maxDistanceInMeters, Point $point, int $maxScale = 2000): array {
        /** @var Collection $locations */
        $locations = Location
            ::withinMetersOfPoint($maxDistanceInMeters, $point)
            ->where('scale', '<=', $maxScale)
            ->get();
        return $this->indexBy($locations, 'entity_id');
    }

    /**
     * @param array $ids
     *
     * @return Entity[] with key entity id
     */
    private function findEntities(array $ids): array {
        $entities = Entity::whereIn('id', $ids)->get();
        return $this->indexBy($entities);
    }

    /**
     * @param array $entityIds
     * @param int   $minConfidence minimum confidence the entity is relevant (0-100)
     *
     * @return Article[]|Collection
     */
    private function findArticlesWithEntities(array $entityIds, int $minConfidence = 80): Collection {
        /** @var Article[] $articles */
        return Article
            ::join('article_entities', 'article_entities.article_id', '=', 'articles.id')
            ->whereIn('entity_id', $entityIds)
            ->where('confidence', '>=', $minConfidence)
            ->orderBy('articles.id', 'DESC')
            ->with('source')
            ->select(['articles.*', 'article_entities.entity_id', 'article_entities.confidence'])
            ->get()
        ;

    }

    private function indexBy(iterable $array, string $column = 'id'): array {
        $sorted = [];
        foreach($array as $item) {
            /** @var Location $location */
            $sorted[$item->{$column}] = $item;
        }
        return $sorted;

    }

    private function serializeEntity(Entity $entity): array {
        return [
            'name' => $entity->name,
            'id' => $entity->id,
            'url' => $entity->url,
        ];
    }
}
