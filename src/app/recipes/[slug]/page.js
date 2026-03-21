import Image from 'next/image';
import { notFound } from 'next/navigation';
import { groq } from 'next-sanity';
import { client } from '../../../lib/sanity';
import NavbarClient from '../../../../components/NavbarClient';

const recipeQuery = groq`*[_type == "recipe" && !(_id in path("drafts.**")) && slug.current == $slug][0]{
  _id,
  title,
  description,
  ingredients,
  steps,
  prepTime,
  difficulty,
  mealType,
  "imageUrl": image.asset->url
}`;

async function getRecipeBySlug(slug) {
  return client.fetch(recipeQuery, { slug }, { perspective: "published" });
}

export default async function RecipePage({ params }) {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  const ingredients =
    typeof recipe.ingredients === 'string'
      ? recipe.ingredients.split('\n').filter((line) => line.trim().length > 0)
      : [];

  const steps =
    typeof recipe.steps === 'string'
      ? recipe.steps.split('\n').filter((line) => line.trim().length > 0)
      : [];

  return (
    <>
      <NavbarClient />
      <main
        style={{
          minHeight: '100vh',
          padding: '72px 20px 80px',
          background: 'linear-gradient(to bottom, #f8fbfc, #eef3f5)',
        }}
      >
      {recipe.imageUrl && (
        <section
          style={{
            margin: '0 -20px 40px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
            }}
          >
            <Image
              src={recipe.imageUrl}
              alt={recipe.title || 'Recipe image'}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </section>
      )}

      <article
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <header style={{ marginBottom: '24px' }}>
          <h1
            style={{
              fontSize: '32px',
              lineHeight: 1.2,
              fontWeight: 600,
              color: '#111827',
              marginBottom: '10px',
              letterSpacing: '-0.03em',
            }}
          >
            {recipe.title}
          </h1>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '13px',
              color: '#6b7280',
              marginTop: '4px',
            }}
          >
            {recipe.mealType && (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#e5f6f9',
                }}
              >
                {recipe.mealType}
              </span>
            )}
            {recipe.difficulty && (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#e5f6f9',
                }}
              >
                {recipe.difficulty}
              </span>
            )}
            {recipe.prepTime && (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#eef2ff',
                }}
              >
                Prep &amp; cook: {recipe.prepTime}
              </span>
            )}
          </div>
        </header>

        {recipe.description && (
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.8,
              color: '#4b5563',
              marginBottom: '32px',
            }}
          >
            {recipe.description}
          </p>
        )}

        {ingredients.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '12px',
              }}
            >
              Ingredients
            </h2>
            <ul style={{ paddingLeft: '20px', color: '#4b5563', lineHeight: 1.8 }}>
              {ingredients.map((line, index) => (
                <li key={index} style={{ marginBottom: '6px' }}>
                  {line}
                </li>
              ))}
            </ul>
          </section>
        )}

        {steps.length > 0 && (
          <section>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '12px',
              }}
            >
              Steps
            </h2>
            <ol
              style={{
                paddingLeft: '22px',
                color: '#4b5563',
                lineHeight: 1.8,
              }}
            >
              {steps.map((line, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  {line}
                </li>
              ))}
            </ol>
          </section>
        )}
      </article>
    </main>
    </>
  );
}


