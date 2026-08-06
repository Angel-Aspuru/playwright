import { products } from '../../data/product-data';

export function getProductId(key: string): string {
    const productId = (products as Record<string, string>)[key];
    if (!productId) {
        throw new Error(`Product with key "${key}" not found.`);
    }
    return productId;
}