import { groq } from 'next-sanity'
import { client } from '../sanity/lib/client'
import { apiVersion, dataset, projectId } from '../sanity/env'

export { client }

export async function getRecipes(limit = 6) {
  const query = groq`*[_type == "recipe" && !(_id in path("drafts.**"))] | order(_createdAt asc)[0...$limit]{
    _id,
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    mealType,
    difficulty,
    nutritionType
  }`
  console.log('[Sanity] getRecipes called', {
    limit,
    projectId,
    dataset,
    apiVersion,
  })

  try {
    const data = await client.fetch(query, { limit }, { perspective: 'published' })
    console.log('[Sanity] getRecipes result', {
      isArray: Array.isArray(data),
      length: Array.isArray(data) ? data.length : null,
      sampleIds: Array.isArray(data) ? data.slice(0, 3).map((r) => r._id) : null,
    })
    return data
  } catch (err) {
    console.error('[Sanity] getRecipes fetch error', err)
    return []
  }
}

