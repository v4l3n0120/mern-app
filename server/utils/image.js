function getFilepath(file){
    const filepath = file.path
    const fileSplit = filepath.split("\\")

    return `${fileSplit[1]}/${fileSplit[2]}`
}

module.exports = {
    getFilepath,
}