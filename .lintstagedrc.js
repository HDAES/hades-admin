
module.exports ={
    '**/*.vue?(x)': filenames => {

        console.log(filenames)
        return filenames.map(filename => `prettier --write '${filename}'`)
    }
}