export function count(data: any[], matcher: { [key: string]: any }): number {
  const key = Object.keys(matcher)[0];
  const value = matcher[key].split(" || ");
  return data.filter(item => value.includes(item[key])).length;
}

// Define the type for the callback function
type MapObjectCallback<T, U> = (value: T, key: string, index: number) => U;

// Define the mapObject function
export function mapObject<T, U>(obj: { [key: string]: T }, callback: MapObjectCallback<T, U>): U[] {
  return Object.keys(obj).map((key, index) => {
    const record = obj[key];
    return callback(record, key, index);
  });
};

/*
// Example usage:
const b = {
  123: { id: 1, name: "Bitta" },
  345: { id: 2, name: "Bitta 2" }
};

// Define the callback type
type RecordType = { id: number; name: string };

// Use mapObject with a callback
const result = mapObject<RecordType, JSX.Element>(b, (record, key, index) => {
  console.log("key", key); // Access the key (123, 345, etc.)
  console.log("index", index); // Access the index (0, 1, etc.)
  console.log("record", record); // Access the actual record ({id:1, name:"Bitta"}, etc.)

  // Return JSX.Element for React rendering
  return (
    <div key={key}>
      <p>Index: {index}</p>
      <p>ID: {record.id}</p>
      <p>Name: {record.name}</p>
    </div>
  );
});
*/

type KeyValuePair<T> = {
  [key: string]: T;
};

export function filterObject<T>(
  obj: KeyValuePair<T>,
  callback: (value: T, key: string, obj: KeyValuePair<T>) => boolean
): KeyValuePair<T> {
  return Object.keys(obj).reduce((acc: KeyValuePair<T>, key: string) => {
    if (callback(obj[key], key, obj)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

/*
// Example usage:
type Item = {
  id: number;
  name: string;
};

const b: KeyValuePair<Item> = {
  120: { id: 1, name: "Bitta" },
  130: { id: 2, name: "Bitta2" }
};

const filteredB = filterObject(b, (item) => item.id !== 2);
console.log(filteredB); // Output: { 120: { id: 1, name: 'Bitta' } }

const filteredB = filterObject(b, (item, key) => key !== "120");
console.log(filteredB); // Output: { 130: { id: 2, name: 'Bitta2' } }
*/

/*
// Example usage:
const b: KeyValuePair<Item> = {
  120: { id: 1, name: "Bitta" },
  130: { id: 2, name: "Bitta2" }
};

const filteredB = filterKey(b, 120)
console.log(filteredB); // Output: { 130: { id: 2, name: 'Bitta2' } }
*/

export function len(data: any[] | { [key: string | number]: any }) {
  if (Array.isArray(data)) {
    return data.length;
  } else if (typeof data === 'object' && data !== null) {
    return Object.keys(data).length;
  } else {
    throw new Error("Input must be an array or an object");
  }
}

/*
// Example usage:
console.log(len([1, 2, 3, 4])); // Output: 4
console.log(len({ a: 1, b: 2, c: 3 })); // Output: 3
*/

export function excludedKey<T extends Record<string | number, any>>(
  obj: T,
  keys: string | string[]
): Partial<T> {
  const keysArray = Array.isArray(keys) ? keys : [keys];

  return Object.keys(obj).reduce((acc: Partial<T>, key) => {
    if (!keysArray.includes(key)) {
      acc[key as keyof T] = obj[key];
    }
    return acc;
  }, {} as Partial<T>);
}

/*
// Example usage:
const input = { a: 1, b: 1, c: 1 };
console.log(excludedKey(input, "b")); // Output: { a: 1, c: 1 }
console.log(excludedKey(input, ["b", "c"])); // Output: { a: 1 }
*/


export function mergeObject(obj1: { [key: string | number]: any }, obj2: { [key: string | number]: any }) {
  const result = { ...obj1 };

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
        if (result[key]) {
          // Merge existing properties in obj1 and obj2
          result[key] = mergeObject(result[key], obj2[key]);
        } else {
          // Add the new property from obj2
          result[key] = obj2[key];
        }
      } else {
        result[key] = obj2[key];
      }
    }
  }

  return result;
}
/*
// Example-1
const a1 = {
  "alpha": { id: 1, name: "Bitta", group: {} },
  "beta": { id: 2, name: "Bitta 2", group: { "name1": { id: 1 } } },
  "gamma": { id: 3, name: "Bitta 3", group: {} },
};

const b1 = {
  "epcillon": { id: 4, name: "Bitta 4", group: {} },
  "pi": { id: 5, name: "Bitta 5", group: {} },
};

console.log(merge(a1, b1));
// Expected output:
 {
   "alpha":{id:1, name:"Bitta", group:{}},
   "beta":{id:2, name:"Bitta 2", group:{"name1":{id:1}}},
   "gamma":{id:3, name:"Bitta 3",group:{}},
   "epcillon":{id:4, name:"Bitta 4",group:{}},
   "pi":{id:5, name:"Bitta 5",group:{}},
 }

// Example-2
const a2 = {
  "alpha": { id: 1, name: "Bitta", group: {} },
  "beta": { id: 2, name: "Bitta 2", group: { "name1": { id: 1 } } },
  "gamma": { id: 3, name: "Bitta 3", group: {} },
};

const b2 = {
  "beta": { id: 2, name: "Bitta 2", group: { "name2": { id: 2 } } },
  "pi": { id: 5, name: "Bitta 5", group: {} },
};

console.log(merge(a2, b2));
// Expected output:
 {
   "alpha":{id:1, name:"Bitta", group:{}},
   "beta":{id:2, name:"Bitta 2", group:{"name1":{id:1}, "name2":{id:2}}},
   "gamma":{id:3, name:"Bitta 3",group:{}},
   "pi":{id:5, name:"Bitta 5",group:{}},
 }

*/