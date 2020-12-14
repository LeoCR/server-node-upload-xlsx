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
        const workbook = new Excel.Workbook();
        const originalFileName=req.file.originalname.toString();
        if(originalFileName.includes('.xlsx')){
            let header=[]
            await workbook.xlsx.readFile(req.file.path).then(function() { 
                workbook.eachSheet(function(worksheet, sheetId) {  
                     worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) { 
                            if(rowNumber===1){
                                row.eachCell(function(cell, colNumber) {
                                    header.push(cell.value)
                                    console.log('Cell ' + colNumber + ' = ' + cell.value);
                                });
                            } 
                    });  
                    worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) { 
                        let cellValues=[] 
                        if(rowNumber>1){
                            row.eachCell(function(cell, colNumber) {
                                cellValues.push(cell.value)
                                console.log('Cell ' + colNumber + ' = ' + cell.value);
                            });
                            tableData.push(cellValues)  
                        }
                    }); 
                }); 
                res.json({
                    header:header,
                    tableDataContent:tableData})
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
app.get('/api/download-xlsx',(req,res)=>{
    try {
        const jsonData={
            header:[
                'ProductName',
                'ProductDescription',
                'ProductPrice'
            ],
            tableDataContent:[
                [
                    "Product Name 1",
                    "Product Description 1",
                    94
                ],
                [
                    "Product Name 2",
                    "Product Description 2",
                    97
                ],
                [
                    "Product Name 3",
                    "Product Description 3",
                    98
                ],
                [
                    "Product Name 4",
                    "Product Description 4",
                    32
                ],
                [
                    "Product Name 5",
                    "Product Description 5",
                    45
                ],
                [
                    "Product Name 6",
                    "Product Description 6",
                    97
                ],
                [
                    "Product Name 7",
                    "Product Description 7",
                    94
                ],
                [
                    "Product Name 8",
                    "Product Description 8",
                    94
                ],
            ]
        }
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Maintenence");
        worksheet.columns = [
            {header: 'Product Name', key: 'productName', width: 20},
            {header: 'Product Description', key: 'productDescription', width: 20},
            {header: 'Product Price', key: 'productPrice', width:20}
        ]
        worksheet.getRow(1).font = {bold: true}
        worksheet.getCell('A1').alignment = { vertical: 'center', horizontal: 'center' };
        worksheet.getCell('B1').alignment = { vertical: 'center', horizontal: 'center' }
        worksheet.getCell('C1').alignment = { vertical: 'center', horizontal: 'center' }
        for (let tableDataIndex = 0; tableDataIndex < jsonData.tableDataContent.length; tableDataIndex++) {
            const tableContentElement = jsonData.tableDataContent[tableDataIndex];
            worksheet.addRow({productName: tableContentElement[0], productDescription: tableContentElement[1],productPrice:tableContentElement[2]}).alignment = { vertical: 'center', horizontal: 'center' };
        } 
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",    
            "Content-Disposition",
            "attachment; filename=" + "tableDataContent.xlsx"
        );
    
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
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