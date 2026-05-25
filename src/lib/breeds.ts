export type Species = "cat" | "dog";

export interface Breed {
  name: string;
  species: Species;
  popular: boolean;
  // false = adult shoulder height / build exceeds the current arch envelope
  // (9.5–15" height, 10.5–16.5" width). Captured for the future XXL version.
  fits: boolean;
}

// Curated list. `popular` rows surface first; everything else is alphabetical.
// Sizing is judged on typical adult shoulder height & shoulder width vs. the
// arch's 9.5–15" height / 10.5–16.5" width envelope.
export const BREEDS: Breed[] = [
  // ---- Cats (essentially all fit; even Maine Coons stay within the envelope)
  { name: "Domestic Shorthair", species: "cat", popular: true, fits: true },
  { name: "Domestic Longhair", species: "cat", popular: true, fits: true },
  { name: "Maine Coon", species: "cat", popular: true, fits: true },
  { name: "Ragdoll", species: "cat", popular: true, fits: true },
  { name: "Persian", species: "cat", popular: true, fits: true },
  { name: "Siamese", species: "cat", popular: true, fits: true },
  { name: "British Shorthair", species: "cat", popular: true, fits: true },
  { name: "Bengal", species: "cat", popular: true, fits: true },
  { name: "Sphynx", species: "cat", popular: true, fits: true },
  { name: "Scottish Fold", species: "cat", popular: true, fits: true },
  { name: "Abyssinian", species: "cat", popular: false, fits: true },
  { name: "American Shorthair", species: "cat", popular: false, fits: true },
  { name: "Birman", species: "cat", popular: false, fits: true },
  { name: "Bombay", species: "cat", popular: false, fits: true },
  { name: "Burmese", species: "cat", popular: false, fits: true },
  { name: "Egyptian Mau", species: "cat", popular: false, fits: true },
  { name: "Exotic Shorthair", species: "cat", popular: false, fits: true },
  { name: "Himalayan", species: "cat", popular: false, fits: true },
  { name: "Manx", species: "cat", popular: false, fits: true },
  { name: "Norwegian Forest Cat", species: "cat", popular: false, fits: true },
  { name: "Oriental Shorthair", species: "cat", popular: false, fits: true },
  { name: "Russian Blue", species: "cat", popular: false, fits: true },
  { name: "Savannah", species: "cat", popular: false, fits: true },
  { name: "Selkirk Rex", species: "cat", popular: false, fits: true },
  { name: "Siberian", species: "cat", popular: false, fits: true },
  { name: "Tonkinese", species: "cat", popular: false, fits: true },
  { name: "Turkish Angora", species: "cat", popular: false, fits: true },

  // ---- Dogs: small breeds (fit comfortably)
  { name: "Chihuahua", species: "dog", popular: true, fits: true },
  { name: "Yorkshire Terrier", species: "dog", popular: true, fits: true },
  { name: "Pomeranian", species: "dog", popular: true, fits: true },
  { name: "French Bulldog", species: "dog", popular: true, fits: true },
  { name: "Dachshund", species: "dog", popular: true, fits: true },
  { name: "Pug", species: "dog", popular: true, fits: true },
  { name: "Shih Tzu", species: "dog", popular: true, fits: true },
  { name: "Miniature Poodle", species: "dog", popular: true, fits: true },
  { name: "Maltese", species: "dog", popular: true, fits: true },
  { name: "Cavalier King Charles Spaniel", species: "dog", popular: true, fits: true },

  // ---- Dogs: popular but too big for the current arch
  { name: "Labrador Retriever", species: "dog", popular: true, fits: false },
  { name: "Golden Retriever", species: "dog", popular: true, fits: false },
  { name: "German Shepherd", species: "dog", popular: true, fits: false },
  { name: "Bernese Mountain Dog", species: "dog", popular: true, fits: false },
  { name: "Old English Sheepdog", species: "dog", popular: true, fits: false },

  // ---- Dogs: alphabetical (mixed sizing)
  { name: "Akita", species: "dog", popular: false, fits: false },
  { name: "Alaskan Malamute", species: "dog", popular: false, fits: false },
  { name: "American Bully", species: "dog", popular: false, fits: false },
  { name: "Australian Cattle Dog", species: "dog", popular: false, fits: false },
  { name: "Australian Shepherd", species: "dog", popular: false, fits: false },
  { name: "Basset Hound", species: "dog", popular: false, fits: false },
  { name: "Beagle", species: "dog", popular: false, fits: true },
  { name: "Bichon Frise", species: "dog", popular: false, fits: true },
  { name: "Bloodhound", species: "dog", popular: false, fits: false },
  { name: "Border Collie", species: "dog", popular: false, fits: false },
  { name: "Boston Terrier", species: "dog", popular: false, fits: true },
  { name: "Boxer", species: "dog", popular: false, fits: false },
  { name: "Brittany", species: "dog", popular: false, fits: false },
  { name: "Bulldog", species: "dog", popular: false, fits: false },
  { name: "Cairn Terrier", species: "dog", popular: false, fits: true },
  { name: "Chow Chow", species: "dog", popular: false, fits: false },
  { name: "Cocker Spaniel", species: "dog", popular: false, fits: true },
  { name: "Collie", species: "dog", popular: false, fits: false },
  { name: "Corgi", species: "dog", popular: false, fits: true },
  { name: "Dalmatian", species: "dog", popular: false, fits: false },
  { name: "Doberman Pinscher", species: "dog", popular: false, fits: false },
  { name: "Goldendoodle", species: "dog", popular: false, fits: false },
  { name: "Great Dane", species: "dog", popular: false, fits: false },
  { name: "Greyhound", species: "dog", popular: false, fits: false },
  { name: "Havanese", species: "dog", popular: false, fits: true },
  { name: "Italian Greyhound", species: "dog", popular: false, fits: true },
  { name: "Jack Russell Terrier", species: "dog", popular: false, fits: true },
  { name: "Japanese Chin", species: "dog", popular: false, fits: true },
  { name: "Labradoodle", species: "dog", popular: false, fits: false },
  { name: "Lhasa Apso", species: "dog", popular: false, fits: true },
  { name: "Mastiff", species: "dog", popular: false, fits: false },
  { name: "Miniature Schnauzer", species: "dog", popular: false, fits: true },
  { name: "Newfoundland", species: "dog", popular: false, fits: false },
  { name: "Norwich Terrier", species: "dog", popular: false, fits: true },
  { name: "Papillon", species: "dog", popular: false, fits: true },
  { name: "Pekingese", species: "dog", popular: false, fits: true },
  { name: "Pit Bull", species: "dog", popular: false, fits: false },
  { name: "Rottweiler", species: "dog", popular: false, fits: false },
  { name: "Saint Bernard", species: "dog", popular: false, fits: false },
  { name: "Samoyed", species: "dog", popular: false, fits: false },
  { name: "Shiba Inu", species: "dog", popular: false, fits: false },
  { name: "Siberian Husky", species: "dog", popular: false, fits: false },
  { name: "Standard Poodle", species: "dog", popular: false, fits: false },
  { name: "Toy Poodle", species: "dog", popular: false, fits: true },
  { name: "Vizsla", species: "dog", popular: false, fits: false },
  { name: "Weimaraner", species: "dog", popular: false, fits: false },
  { name: "West Highland White Terrier", species: "dog", popular: false, fits: true },
  { name: "Whippet", species: "dog", popular: false, fits: false },
];
