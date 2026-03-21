import { defineField, defineType } from 'sanity'

export const recipeType = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Recipe Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description:
        'A short, outcome-focused description shown on the Recipes section.',
    }),

    defineField({
      name: 'mealType',
      title: 'Meal Type',
      type: 'string',
      description: 'e.g. Breakfast, Lunch & Dinner, Snacks',
      options: {
        list: [
          { title: 'Breakfast', value: 'breakfast' },
          { title: 'Lunch', value: 'lunch' },
          { title: 'Dinner', value: 'dinner' },
          { title: 'Snack', value: 'snack' },
        ],
      },
    }),

    defineField({
      name: 'nutritionType',
      title: 'Nutrition Type',
      type: 'string',
      options: {
        list: [
          { title: 'High Protein', value: 'high-protein' },
          { title: 'Weight Loss', value: 'weight-loss' },
          { title: 'Balanced', value: 'balanced' },
          { title: 'Vegan', value: 'vegan' },
        ],
      },
    }),

    // FREE TEXT INGREDIENTS
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text',
      rows: 6,
    }),

    // FREE TEXT STEPS
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'text',
      rows: 8,
    }),

    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Medium', value: 'medium' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
    }),

    defineField({
      name: 'prepTime',
      title: 'Prep & Cook Time',
      type: 'string',
      description: 'Human-readable time, e.g. "20–30 minutes".',
    }),
  ],
})

