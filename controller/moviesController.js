import movieModel from "../models/movieModel.js"

export const listMovie = async (req, res) => {
    try{
        const data = await movieModel.find({})

        res.status(200).json({
            movies : "List movies",
            data : data
        })
    } catch (error) {
        res.status(500).json({
            movies : error,
            data : null
        })
    }
}

export const createNewMovie = async (req, res)=>{
    try {
        const request = req.body

        const response = await movieModel.create({
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara
        })

        res.status(201).json({
            movies: "Movie berhasil dibuat",
            data: response
        })

    } catch (error) {
        res.status(500).json({
            movies: error.message,
            data: null
        })
    }
}

export const updateMovie = async (req, res) => {
    try{
        const id = req.params?.id
        const request = req.body

        if(!id){
            return res.status(500).json({
                movies : "Id wajib di isi",
                data : null
            })
        }

        const response = await movieModel.findByIdAndUpdate(id, {
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara
        })

        if(!response){
            return res.status(500).json({
                movies : "Movie gagal di update",
                data : null
            })
        }

        return res.status(200).json({
            movies : "Movie berhasil diupdate",
            data : null
        })      

    } catch (error) {
        res.status(500).json({
            movies : error,
            data : null
        })
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id

        if(!id){
            return res.status(500).json({
                movies : "Id wajib di isi",
                data : null
            })
        }

        const response = await movieModel.findByIdAndDelete(id)

        if(response){
            return res.status(200).json({
                movies : "Movie berhasil di hapus",
                data : null
            })
        }

        return res.status(404).json({
            movies : "Movie tidak ditemukan",
            data : null
        })
    } catch (error) {
        res.status(500).json({
            movies : error,
            data : null
        })
    }
}