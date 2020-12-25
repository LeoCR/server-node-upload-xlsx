const express = require('express'),
path = require('path'), 
app = express(),
bodyParser = require('body-parser'), 
cors = require('cors'),
Excel = require('exceljs'), 
multer  = require('multer');

const storage = multer.diskStorage(
  {
      destination: path.resolve('./uploads/'),
      filename: function ( req, file, cb ) { 
          cb( null, file.originalname);
      }
  }
);
const upload = multer({ storage: storage });
const models = require(path.resolve(__dirname+"/config/config.js"));
models.sequelize.sync().then(function() {
    console.log('https://localhost:49658 DB conected succesfully')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});
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
app.get('/api/download-xlsx',async(req,res)=>{
    try { 
        const productModel = models.product;
        const products =await productModel.findAll(); 
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
        for (const itertrPrdct of products) {
            console.log('iteratorProduct.PRODUCT_NAME '+itertrPrdct.PRODUCT_NAME)
            worksheet.addRow({productName: itertrPrdct.PRODUCT_NAME, productDescription: itertrPrdct.PRODUCT_DESCRIPTION,productPrice:itertrPrdct.PRODUCT_PRICE}).alignment = { vertical: 'center', horizontal: 'center' };
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