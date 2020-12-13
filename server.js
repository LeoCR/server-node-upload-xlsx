const express = require('express'),
path = require('path'), 
app = express(),
bodyParser = require('body-parser'), 
cors = require('cors'),
Excel = require('exceljs'), 
multer  = require('multer');

var storage = multer.diskStorage(
  {
      destination: path.resolve('./uploads/'),
      filename: function ( req, file, cb ) { 
          cb( null, file.originalname);
      }
  }
);
var upload = multer({ storage: storage });

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
})); 

app.use(bodyParser.json());

app.post('/api/upload-xlsx',upload.single('image'),async(req,res)=>{
    let tableData=[]; 
    try {
        var workbook = new Excel.Workbook();
        const originalFileName=req.file.originalname.toString();
        if(originalFileName.includes('.xlsx')){
            await workbook.xlsx.readFile(req.file.path).then(function() {
                workbook.eachSheet(function(worksheet, sheetId) { 
                    let header=[]
                     worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) { 
                            if(rowNumber===1){
                                row.eachCell(function(cell, colNumber) {
                                    header.push(cell.value)
                                    console.log('Cell ' + colNumber + ' = ' + cell.value);
                                });
                            } 
                    }); 
                    tableData.push({
                        header
                    }) 
                    worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) { 
                        let cellValues=[] 
                        if(rowNumber>1){
                            row.eachCell(function(cell, colNumber) {
                                cellValues.push(cell.value)
                                console.log('Cell ' + colNumber + ' = ' + cell.value);
                            });
                            tableData.push({
                                tableContent:cellValues
                            })  
                        }
                    }); 
                }); 
                res.json(tableData)
            })
            .catch((error)=>{
                res.json({
                    error:true,
                    errorMessage:error
                }) 
            })
        }
        else{
            res.json({
                error:true,
                errorMessage:"Invalid type file"
            })
        }
       
    } catch (error) {
        res.json({
            error:true,
            errorMessage:error
        })
    }
})
app.listen(45398, () => {
    console.log(`http://localhost:45398`)
}) 