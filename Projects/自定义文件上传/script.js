let fileInput = document.querySelector('#file-input'),
numOfFiles = document.querySelector('#num-of-files'),
filesList = document.querySelector('#files-list');

// 当用户改变表单的内容时
fileInput.addEventListener('change',function() {
    // 返回选择的文件对象fileInput.files
    filesList.innerHTML = '';
    numOfFiles.textContent = `${this.files.length} Files Selected`;

    for(let fileItem of this.files)
    {
        let listItem = document.createElement('li');
        let fileName = fileItem.name;
        let fileSize = (fileItem.size / 1024).toFixed(1) + 'KB'; 
        
        if ((fileItem.size / 1024) >= 1024) 
        {
            fileSize = (fileItem.size / 1024 / 1024).toFixed(1) + 'MB';
        }

        if (fileName.length > 40)
        {
            fileName = fileName.substr(0,40) + '...';
        }

        listItem.innerHTML = `<span>${fileName}</span><span>${fileSize}</span>`;    
        filesList.appendChild(listItem);
    }
})