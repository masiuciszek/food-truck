/* eslint-disable import/no-unresolved */
import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';
import { NextFunction } from 'express';
import { IDish } from './Documents';

const DishSchema = new Schema<IDish>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    img: {
      type: Buffer,
      trim: true,
    },
    slug: String,
    category: {
      type: String,
      enum: ['main', 'starter', 'snack', 'dessert'],
      default: 'main',
    },
    price: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

DishSchema.pre<IDish>('save', async function (
  next: NextFunction
): Promise<void> {
  this.slug = slugify(this.title, { lower: true, replacement: '-' });
  next();
});

DishSchema.virtual('reviews', {
  ref: 'Review', // what model to link?
  localField: '_id', // which field on the store?
  foreignField: 'dish', // which field on the review?
});

const Dish = mongoose.model<IDish>('Dish', DishSchema);

export default Dish;
