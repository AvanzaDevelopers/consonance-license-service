const fs = require("fs").promises;
const crypto = require("crypto");

async function readLicenseData() {
  try {
    const bankInfoRaw = await fs.readFile("BankInfo.json", "utf8");
    return JSON.parse(bankInfoRaw);
  } catch (error) {
    console.error("Error reading license data:", error);
    throw error;
  }
}

async function encryptLicenseData(data, key) {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encryptedData = cipher.update(JSON.stringify(data), "utf8", "base64");
  encryptedData += cipher.final("base64");
  return encryptedData;
}

async function generateKeysAndExport() {
  try {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });

    await fs.writeFile("public.pem", publicKey.export({
      type: "pkcs1",
      format: "pem",
    }));

    await fs.writeFile("private.pem", privateKey.export({
      type: "pkcs1",
      format: "pem",
    }));

    console.log("Keys generated and exported successfully.");
  } catch (error) {
    console.error("Error generating and exporting keys:", error);
    throw error;
  }
}

async function signLicense() {
  try {
    // await generateKeysAndExport();

    const licenseData = await readLicenseData();
    const licenseDataString = JSON.stringify(licenseData);
    const privateKey = await fs.readFile("private.pem", "utf8");
    const encryptionKey = "YourEncryptionKey"; 
    const encryptedLicenseData = await encryptLicenseData(licenseData, encryptionKey);
    const signature = crypto.sign("sha256", Buffer.from(licenseDataString), {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    });
    
    // console.log(signature)
  
  // signature = signature.data

    const signedLicense = {
      data: encryptedLicenseData,
      signature: signature.toString('base64'),
    };

    await fs.writeFile("license.signed", JSON.stringify(signedLicense));
    console.log("License signed and saved successfully.");

  } catch (error) {
    console.error("Error signing license:", error);
  }
}

signLicense();
