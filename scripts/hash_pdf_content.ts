import fs from "fs"
import crypto from "crypto";

const hash_doc = async () => {
    const pdfBuffer = fs.readFileSync("./assets/fake_bill.pdf");
    var hash = crypto.createHash('sha256').update(pdfBuffer).digest('hex');
    hash = crypto.createHash('sha256').update(hash + Math.random()).digest('hex');
    console.log("Hash Document", hash)
}

hash_doc()