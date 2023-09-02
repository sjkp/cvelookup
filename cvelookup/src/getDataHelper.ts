import fs from 'node:fs'; // 👈 "node:" prefix is an Astro requirement for Node libs
import {join} from 'node:path'
import type { OpenSourceVulnerability } from './osv-schema';

const getCVE = (slug: string) => {
    const parts = slug.split('/');
    const raw = fs.readFileSync(`./../advisory-database/advisories/github-reviewed/${slug}/${parts.at(-1)}.json`);

    return JSON.parse(raw) as OpenSourceVulnerability;
}

export const getAllCVES = () => {

    return getAllSlugs().slice(-10).map(s => ({slug: s, ...getCVE(s)}));
}

export const getAllSlugs = () => {
    const makeSlug = (path: string) => {
        var parts = path.split('\\');
        return parts.slice(4,7).join('/');
    }

    const walk = (dirPath: string) => fs.readdirSync(dirPath, { withFileTypes: true }).map((entry) => {
          const childPath = join(dirPath, entry.name)
          
          return entry.isDirectory() ? walk(childPath) : makeSlug(childPath)
        });      

    const all = walk('./../advisory-database/advisories/github-reviewed/').flat(Number.POSITIVE_INFINITY) as string[];
    return all;
}


export default getCVE;