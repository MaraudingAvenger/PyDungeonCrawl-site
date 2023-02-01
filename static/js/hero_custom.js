const debuffs = {
    "Frailty": "Reduces damage done by 5% (stacking)",
    "Expose Weakness": "Increases damage received by 5% (stacking)",
    "Stun": "Target cannot take any action while stun is active",
    "Blind": "Target will miss attacks while blind is active",
    "Root": "Target cannot move from current position",
    "Poison Vulnerability": "Doubles the effectiveness of poisons",
    "Frost Resistance": "Reduces Frost damage taken by 10% (stacking)",
    "Fire Resistance": "Reduces Fire damage taken by 10% (stacking)",
    "Magic Vulnerability": "When an enemy has both Frost Resistance and Fire Resistance at the end of a turn they combine into Magic Vulnerability, increasing magic damage they take by 10% per stack. Taking magic damage will consume this debuff.",
    "Embarassed": "You are very embarassed! (bonus: check the description text)"
}

const buffs = {
    "Might": "Increase damage done by 5% (stacking)",
    "Toughness": "Reduces damage received by 5% (stacking)",
    "NextAttack": "Increase damage done by X% on next attack (value on creation)",
    "Barrier": "Absorb and store all damage for X turns (owned by caster, object passed)",
    "Reflect": "Reflect 50% of damage received back to target (can receive increasing modifiers)",
    "Parry": "Completely avoid an attack",
    "Cure": "Remove negative ailments from the target",
    "Heal": "Increase the health points of the target"
}

// array of words to be searched
const wordsToBeSearched = ['Frailty', 'ExposeWeakness', 'Stun','Blind','Root','PoisonVulnerability','FrostResistance','FireResistance',
'MagicVulnerability','Might','Toughness','NextAttack','Barrier','Reflect','Parry','Cure', 'Heal', 'Embarassed'];


let tagElements = document.getElementsByClassName('ability');

for (let tagElement of tagElements) {
// add removal of punctuation (periods, commas, etc)
  let tagWords = tagElement.innerText.replace(/[\.,;:\-_\(\)]/g,"").split(" ");
  let lastCapWordIndex = 0;
  
  // get the index of the last word at the beginning of the string that is capitalized
  for (let i = 0; i < tagWords.length; i++) {
    if (tagWords[i].charAt(0) !== tagWords[i].charAt(0).toUpperCase()) {
      break;
    }
    lastCapWordIndex = i;
  }

  // get the index in tagElement of the last capitalized word
  let lastCapIndex = 0;
  for (let i = 0; i < lastCapWordIndex; i++) {
    lastCapIndex += tagWords[i].length + 1;
  }
  
  // iterate through words starting with the last capitalized word
  [...new Set(tagWords.slice(lastCapWordIndex))].forEach(word => {

      // check if word exists in array
      if (wordsToBeSearched.indexOf(word) !== -1) {

          // create new element
          const clean_word = word.replace(/([A-Z])/g, ' $1').trim();
          let newElem = document.createElement("span");
          newElem.innerText = clean_word;
          newElem.classList.add('xtooltip');

          if (word in buffs) {
            newElem.classList.add('buff-highlights')
            let innerspan = document.createElement("span");
            innerspan.innerText = buffs[word];
            innerspan.classList.add('xtooltiptext');
            newElem.append(innerspan);
            
          } else {
            newElem.classList.add('debuff-highlights')
            let innerspan = document.createElement("span");
            innerspan.innerText = debuffs[clean_word];
            innerspan.classList.add('xtooltiptext');
            newElem.append(innerspan);
          }
          
          let re = new RegExp('\\b'+word+'\\b', "g");
          
          // replace text after the last capitalized word with the new element
          
          tagElement.innerHTML = tagElement.innerHTML.trim().slice(0,lastCapIndex+34) + tagElement.innerHTML.trim().slice(lastCapIndex+34).replaceAll(re, newElem.outerHTML);
      }
  });
  
}