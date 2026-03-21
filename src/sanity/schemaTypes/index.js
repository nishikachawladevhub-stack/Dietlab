import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { recipeType } from './recipeType'
import client from './client'

export const schema = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    recipeType,
    client
  ],
}