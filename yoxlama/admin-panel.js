const homeworkInput = document.getElementById('homeworkInput');
const homeworkList = document.getElementById('homeworkList');

let homeworks = [];

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
    date: new Date(),
    grade: "",
    comment: ""
  };

  homeworks.push(folder);
  renderHomeworks();
}

function filterHomeworks() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const filtered = homeworks.filter(hw => hw.name.toLowerCase().includes(search));
    renderHomeworks(filtered);
  }
  
  function sortByDate() {
    const sorted = [...homeworks].sort((a, b) => b.date - a.date);
    renderHomeworks(sorted);
  }

function renderHomeworks() {
  homeworkList.innerHTML = "";

  homeworks.forEach((folder, index) => {
    const div = document.createElement("div");
    div.className = "file-item";

    div.innerHTML = `
      <strong>📁 ${folder.name}</strong><br>
      <textarea placeholder="Qeyd yaz..." oninput="updateComment(${index}, this.value)">${folder.comment}</textarea>
      <input type="text" placeholder="Qiymət ver..." value="${folder.grade}" oninput="updateGrade(${index}, this.value)">
      <button onclick="downloadZip(${index})">ZIP kimi yüklə</button>
      <button onclick="deleteHomework(${index})">Sil</button>
    `;

    homeworkList.appendChild(div);
  });
}

function updateComment(index, value) {
  homeworks[index].comment = value;
}

function updateGrade(index, value) {
  homeworks[index].grade = value;
}

function deleteHomework(index) {
  if (confirm("Tapşırıq silinsin?")) {
    homeworks.splice(index, 1);
    renderHomeworks();
  }
}

function downloadZip(index) {
  const folder = homeworks[index];
  const zip = new JSZip();

  folder.files.forEach(file => {
    const path = file.webkitRelativePath.replace(folder.name + '/', '');
    zip.file(path, file);
  });

  zip.generateAsync({ type: "blob" }).then(function(content) {
    saveAs(content, `${folder.name}.zip`);
  });
}
