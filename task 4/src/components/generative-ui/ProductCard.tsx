import React from 'react';
import { ShoppingBag, Star, Check } from 'lucide-react';

export interface ProductCardProps {
  name: string;
  category: string;
  price: string;
  rating: number;
  description: string;
  features?: string[];
  inStock?: boolean;
}

export function ProductCard({
  name,
  category,
  price,
  rating,
  description,
  features,
  inStock = true,
}: ProductCardProps) {
  return (
    <div className="glass-card overflow-hidden p-5 sm:p-6" data-testid="product-card">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">{category}</span>
          <h3 className="text-xl font-bold text-white mt-0.5">{name}</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 text-xs font-bold text-amber-300">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-300 mt-3 leading-relaxed">{description}</p>

      {features && features.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-3 text-xs text-slate-300">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Price</span>
          <span className="text-2xl font-extrabold text-white">{price}</span>
        </div>
        <button
          type="button"
          disabled={!inStock}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
