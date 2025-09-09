// @ts-check
import MiniSearch from 'minisearch';
import data from './data.json' assert { type: 'json' };

/** Build an index from JSON docs */
export function buildIndex(){
  const ms = new MiniSearch({ fields: ['title','body'], storeFields: ['title','body'], searchOptions: { boost: { title: 2 } } });
  ms.addAll(data);
  return ms;
}
