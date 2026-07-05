const transformProfiles = {

  "original-romaji": {
    output: [
      "original",
      "romaji"
    ],
    romaji: true,
    translate: false
  },

  "original-translation": {
    output: [
      "original",
      "translation"
    ],
    romaji: false,
    translate: true
  },

  "romaji-translation": {
    output: [
      "romaji",
      "translation"
    ],
    romaji: true,
    translate: true
  },

  all: {
    output: [
      "original",
      "romaji",
      "translation"
    ],
    romaji: true,
    translate: true
  },

  "original-romaji-legacy": {
    serializer: "legacy",
    output: [
      "original",
      "romaji"
    ],
    romaji: true,
    translate: false
  },

  "original-translation-legacy": {
    serializer: "legacy",
    output: [
      "original",
      "translation"
    ],
    romaji: false,
    translate: true
  },

  "romaji-translation-legacy": {
    serializer: "legacy",
    output: [
      "romaji",
      "translation"
    ],
    romaji: true,
    translate: true
  }

};

export default transformProfiles;