# Bank License Generator

This repository contains a tool for generating licenses for banks. The generated licenses include encrypted data along with a signature. Below are the steps to generate a license and integrate it into a MongoDB document.

## Usage

1. Edit the BankInfo.json file with the correct bank information:

2. Update the bankName field with the name of the bank.
Update the msp field with the bank's Membership Service Provider.
Update the issueDate and expiryDate fields with the appropriate dates.

3. Generate the license by running the following command:

    node index.js

4. Upon successful execution, a license.signed file will be generated in the project directory.
  
5. Copy the contents of the licenseSign object from license.signed.

6. Insert the copied contents into the licenseSign field of your MongoDB document. The structure should resemble the example provided below:

"licenseSign" : {
                  "data" : "5RQTyeTl/Hn15ij+w24CFJM3nTg1649YrrBNWiGRIV1EHPwkR2zGhZbeGTUuZI4sVGOczuB5hUZ1qx8mAYmvR/uvRIHgZYAHLMiAMhGYG2Rrq8rVBhL5EfQgP6gfehXJ",
                  "signature" : "V9N1FJDEOcJHzYGspZhosH5GsQ/993BR46VM7WiyUHZ/yQM+IfoanGwo//rCEEafT3HhaNjP8qsmegFUkLv8SG0x62eGOtqeRvsRaU9sw3BhRw8/PtDq/HXBfxuqiC13lar3qGn2B2w3XS2H7Sun4CmSE//Mni7h2sYJOEjSNo8/QjT83TNnP/KkY1V+Z2mDFhNwLqbI/CztyIV0o8UvoWv1Y9avgHG87fWRw9CVCJqPJgqeQUrUUb/rPDiQkMJ8mKbipM0/HoejheF3wvh8trbC8B9ns8WkqmxI2Rdealch9IILEM1OeK4t0TQ8dSC6sk+cjOKqMJCJdVxzzYdduw=="
}
