import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

// reactCache is for request memoization
// nextCache is for data cache and everything built into NextJS

type Callback = (...args: any[]) => Promise<any>;
export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
  ) {
    // first cache usinng React, then cache using Next
    // and pass in all necessary arguments
    return nextCache(reactCache(cb), keyParts, options);
}