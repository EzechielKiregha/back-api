import { faker } from '@faker-js/faker'
import { PrismaClient } from 'generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Create users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      return prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: faker.internet.password(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
          avatar: faker.image.avatar(),
          role: faker.helpers.arrayElement([
            'user',
            'admin',
          ]),
          isVerified: faker.datatype.boolean(),
          isAdmin: faker.datatype.boolean(),
        },
      })
    }),
  )

  // Create products
  const products = await Promise.all(
    Array.from({ length: 40 }).map(async () => {
      const randomUser =
        faker.helpers.arrayElement(users)
      return prisma.product.create({
        data: {
          userId: randomUser.id,
          name: faker.commerce.productName(),
          description:
            faker.commerce.productDescription(),
          price: parseFloat(
            faker.commerce.price(),
          ),
          category: faker.commerce.department(),
          isPublished: faker.datatype.boolean(),
          isFeatured: faker.datatype.boolean(),
          approvedForSale:
            faker.helpers.arrayElement([
              'pending',
              'approved',
              'denied',
            ]),
          images: {
            create: Array.from({
              length: faker.number.int({
                min: 1,
                max: 4,
              }),
            }).map(() => ({
              url: faker.image.urlLoremFlickr(),
            })),
          },
        },
      })
    }),
  )

  // Create product files
  await Promise.all(
    Array.from({ length: 20 }).map(async () => {
      const randomUser =
        faker.helpers.arrayElement(users)
      const randomProducts =
        faker.helpers.arrayElements(
          products,
          faker.number.int({
            min: 1,
            max: 3,
          }),
        )
      return prisma.productFile.create({
        data: {
          userId: randomUser.id,
          products: {
            connect: randomProducts.map(
              (product) => ({ id: product.id }),
            ),
          },
        },
      })
    }),
  )

  // Create orders
  await Promise.all(
    Array.from({ length: 15 }).map(async () => {
      const randomUser =
        faker.helpers.arrayElement(users)
      const randomProducts =
        faker.helpers.arrayElements(
          products,
          faker.number.int({
            min: 1,
            max: 5,
          }),
        )
      return prisma.order.create({
        data: {
          userId: randomUser.id,
          isPaid: faker.datatype.boolean(),
          products: {
            connect: randomProducts.map(
              (product) => ({ id: product.id }),
            ),
          },
        },
      })
    }),
  )

  // Create product reviews
  await Promise.all(
    Array.from({ length: 50 }).map(async () => {
      const randomUser =
        faker.helpers.arrayElement(users)
      const randomProduct =
        faker.helpers.arrayElement(products)
      return prisma.productReview.create({
        data: {
          userId: randomUser.id,
          productId: randomProduct.id,
          rating: faker.number.int({
            min: 1,
            max: 5,
          }),
          comment: faker.lorem.sentence(),
        },
      })
    }),
  )

  // Create media
  await Promise.all(
    Array.from({ length: 20 }).map(async () => {
      const randomUser =
        faker.helpers.arrayElement(users)
      return prisma.media.create({
        data: {
          userId: randomUser.id,
          mediaUrl: faker.image.urlLoremFlickr(),
          mediaType: faker.helpers.arrayElement([
            'image',
            'video',
          ]),
        },
      })
    }),
  )
}

main()
  .then(async () => {
    console.log('Seeding completed.')
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(
      'Error seeding database:',
      error,
    )
    await prisma.$disconnect()
    process.exit(1)
  })
