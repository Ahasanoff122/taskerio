const homeworkInput = document.getElementById('homeworkInput');
const homeworkList = document.getElementById('homeworkList');

let userHomeworks = [];

// Tapşırıq əlavə etmək
function addHomework() {
  const files = Array.from(homeworkInput.files);
  if (files.length === 0) {
    alert("Zəhmət olmasa qovluq seçin.");
    return;
  }

  const folderName = files[0].webkitRelativePath.split('/')[0];
  const folder = {
    name: folderName,
    files: files,
    date: new Date()
  };

  userHomeworks.push(folder);
  displayHomeworks();
}

// Axtarış funksiyası
function filterHomeworks() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const filtered = userHomeworks.filter(hw => hw.name.toLowerCase().includes(search));
  displayFiltered(filtered);
}

// Tarixə görə sırala
function sortByDate() {
  const sorted = [...userHomeworks].sort((a, b) => b.date - a.date);
  displayFiltered(sorted);
}

// Tapşırıqları göstər (filter və ya sort üçün)
function displayFiltered(list) {
  homeworkList.innerHTML = "";

  list.forEach((folder, index) => {
    const div = document.createElement("div");
    div.className = "file-item";
    div.innerHTML = `
      <strong>📁 ${folder.name}</strong><br>
      <div class="comment">Tarix: ${folder.date.toLocaleString()}</div>
      <button onclick="downloadZip(${index})">ZIP kimi yüklə</button>
    `;
    homeworkList.appendChild(div);
  });
}

// Tapşırıqları göstər (default)
function displayHomeworks() {
  homeworkList.innerHTML = "";

  userHomeworks.forEach((folder, index) => {
    const div = document.createElement("div");
    div.className = "file-item";
    div.innerHTML = `
      <strong>📁 ${folder.name}</strong><br>
      <div class="comment">Tarix: ${folder.date.toLocaleString()}</div>
      <button onclick="downloadZip(${index})">ZIP kimi yüklə</button>
    `;
    homeworkList.appendChild(div);
  });
}

// ZIP faylı kimi yüklə
function downloadZip(index) {
  const folder = userHomeworks[index];
  const zip = new JSZip();

  folder.files.forEach(file => {
    const path = file.webkitRelativePath.replace(folder.name + '/', '');
    zip.file(path, file);
  });

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, `${folder.name}.zip`);
  });
}
