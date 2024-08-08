let selectedFile;
document.getElementById("fileUpload").addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
});

document.getElementById("uploadExcel").addEventListener("click", () => {
    if (selectedFile) {
        console.log("hi");
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            var data = event.target.result;

            var workbook = XLSX.read(data, {
                type: "binary",
            });
            workbook.SheetNames.forEach((sheet) => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(
                    workbook.Sheets[sheet]
                );
                let jsonObject = JSON.stringify(rowObject);
                document.getElementById("jsonData").innerHTML = jsonObject;
                console.log(jsonObject);
            });
        };
        fileReader.readAsBinaryString(selectedFile);
    }
});