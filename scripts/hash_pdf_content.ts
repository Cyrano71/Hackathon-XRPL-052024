import fs from "fs"
import crypto from "crypto";

const hash_doc = async () => {
    const pdfBuffer = fs.readFileSync("./assets/fake_bill.pdf");
    var hash = crypto.createHash('sha256').update(pdfBuffer).digest('hex');
    for (let i = 0; i < 3; i++) {
        hash = crypto.createHash('sha256').update(hash + Math.random()).digest('hex');
        const result = "\"" + hash +  "\","
        console.log(result)
    }
}

hash_doc()