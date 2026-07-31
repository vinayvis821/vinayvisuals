"use server";

import { listImages } from "../lib/r2";

export async function getImages(prefix: string = ""): Promise<string[]> {
  return listImages(prefix);
}
