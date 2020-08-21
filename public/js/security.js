const fs = require('fs');
const path = require('path');
const db = require('../../src/database/models')


const input = document.querySelectorAll('.form-control');
const buttons = document.querySelectorAll("nav button");
input.addEventListener("input", () => {
  const clean = sanitize(input.value, {
    FORBID_ATTR: ["width", "height", "style"],
    FORBID_TAGS: ["style"],
  });
  output.innerHTML = clean.replace(/\n/g, "<br>");
});