let selectedFile;
let copyText;
document.getElementById("fileUpload").addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
});

document.getElementById("uploadExcel").addEventListener("click", () => {

    if (selectedFile) {
        console.log("hi");
        var fileReader = new FileReader();
        fileReader.onload = (event) => {
            let data = event.target.result;

            let workbook = XLSX.read(data, {
                type: "binary",
            });
            workbook.SheetNames.forEach((sheet) => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(
                    workbook.Sheets[sheet]
                );
                let jsonObject = JSON.stringify(rowObject);
                document.getElementById("jsonData").innerHTML = jsonObject;
                console.log(jsonObject);
                copyText = jsonObject
                
            });
        };
        fileReader.readAsBinaryString(selectedFile);
    } else {
        alert('Please, pick a file')
    }
});

const copyClip = async () => {
    try {
        // Copy the text to the clipboard
        await navigator.clipboard.writeText(copyText);

        // Optionally, you can display a message to the user
        alert("Text copied to clipboard: ");
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
}