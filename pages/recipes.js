import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/DietLabPage.module.css';
import { getRecipes } from '../src/lib/sanity';
import Navbar from '../components/Navbar';

const mealTypeLabels = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

const difficultyLabels = {
  easy: 'Easy',
  medium: 'Medium',
  advanced: 'Advanced',
};

const nutritionTypeLabels = {
  'high-protein': 'High Protein',
  'weight-loss': 'Weight Loss',
  balanced: 'Balanced',
  vegan: 'Vegan',
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [mealFilter, setMealFilter] = useState('all');
  const [nutritionFilter, setNutritionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getRecipes(12)
      .then((data) => {
        console.log('Fetched recipes data:', data);
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch recipes:', err);
      });
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesMeal =
      mealFilter === 'all' ||
      (recipe.mealType && recipe.mealType === mealFilter);

    const matchesNutrition =
      nutritionFilter === 'all' ||
      (recipe.nutritionType && recipe.nutritionType === nutritionFilter);

    const title = recipe.title || '';
    const matchesSearch =
      searchTerm.trim().length === 0 ||
      title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesMeal && matchesNutrition && matchesSearch;
  });

  return (
    <>
      <Head>
        <title>All Recipes - Diet Lab</title>
        <meta
          name="description"
          content="Browse all Diet Lab recipes in one place."
        />
      </Head>

      <Navbar />
      
      <div className={styles.recipesPageWrapper}>
        <main className={styles.recipesPage}>
          <section className={styles.recipesPageInner}>
          <header className={styles.recipesHeader}>
            <h1 className={styles.recipesTitle}>All recipes</h1>
            <p className={styles.recipesSubtitle}>
              The recipes you find on Diet Lab are tried and true — inspired by
              the people and places we love most. As our collection continues to
              grow, we hope you take a look and stay awhile. There&apos;s
              something for everyone — novice to expert.
            </p>
          </header>

          <div className={styles.recipesLayout}>
            {/* Left Sidebar - Filters */}
            <aside className={styles.recipesSidebar}>
              <h2 className={styles.recipesSidebarTitle}>Filter by</h2>

              <div className={styles.recipesFilterGroup}>
                <label
                  className={styles.recipesFilterLabel}
                  htmlFor="meal-filter"
                >
                  Meal Type
                </label>
                <select
                  id="meal-filter"
                  className={styles.recipesFilterSelect}
                  value={mealFilter}
                  onChange={(e) => setMealFilter(e.target.value)}
                >
                  <option value="all">All meals</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>

              <div className={styles.recipesFilterGroup}>
                <label
                  className={styles.recipesFilterLabel}
                  htmlFor="nutrition-filter"
                >
                  Nutrition Type
                </label>
                <select
                  id="nutrition-filter"
                  className={styles.recipesFilterSelect}
                  value={nutritionFilter}
                  onChange={(e) => setNutritionFilter(e.target.value)}
                >
                  <option value="all">All nutrition goals</option>
                  <option value="high-protein">High Protein</option>
                  <option value="weight-loss">Weight Loss</option>
                  <option value="balanced">Balanced</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>

              <div className={styles.recipesFilterGroup}>
                <label
                  className={styles.recipesFilterLabel}
                  htmlFor="recipe-search"
                >
                  Search
                </label>
                <input
                  id="recipe-search"
                  type="search"
                  className={styles.recipesFilterSearch}
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </aside>

            {/* Right Content - Recipe Grid */}
            <div className={styles.recipesContent}>
              <div className={styles.recipesGridWrapper}>
                <div className={styles.servicesContainer}>
                  {filteredRecipes.map((recipe) => {
                    const href = recipe.slug ? `/recipes/${recipe.slug}` : '#';
                    const mealLabel = mealTypeLabels[recipe.mealType] || null;
                    const difficultyLabel =
                      difficultyLabels[recipe.difficulty] || null;
                    const nutritionLabel =
                      nutritionTypeLabels[recipe.nutritionType] || null;

                    // Build tags array
                    const tags = [];
                    if (mealLabel) tags.push(mealLabel.toUpperCase());
                    if (nutritionLabel) tags.push(nutritionLabel.toUpperCase());
                    if (difficultyLabel)
                      tags.push(difficultyLabel.toUpperCase());

                    const Card = (
                      <article className={styles.serviceCard}>
                        {recipe.imageUrl && (
                          <div className={styles.recipeCardImageWrapper}>
                            <Image
                              src={recipe.imageUrl}
                              alt={recipe.title || 'Recipe image'}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={styles.recipeCardImage}
                            />
                          </div>
                        )}

                        {tags.length > 0 && (
                          <div className={styles.recipeTags}>
                            {tags.map((tag, idx) => (
                              <span key={idx} className={styles.recipeTag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <h2 className={styles.serviceCardTitle}>
                          {recipe.title}
                        </h2>

                        {recipe.description && (
                          <p className={styles.serviceCardText}>
                            {recipe.description}
                          </p>
                        )}
                      </article>
                    );

                    return recipe.slug ? (
                      <Link
                        href={href}
                        key={recipe._id}
                        className={styles.recipeCardLink}
                      >
                        {Card}
                      </Link>
                    ) : (
                      <div key={recipe._id}>{Card}</div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          </section>
        </main>
      </div>
    </>
  );
}

