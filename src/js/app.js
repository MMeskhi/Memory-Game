const table = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

for (let i = 0; i < table.length; i++) {
  for (let j = 0; j < table[i].length; j++) {
    const div = document.createElement("div");
    div.innerText = table[i][j];
    div.style.top = i * 100 + "px";
    div.style.left = j * 100 + "px";
    div.dataset.i = i;
    div.dataset.j = j;
    document.getElementById("table").appendChild(div);
  }
}
