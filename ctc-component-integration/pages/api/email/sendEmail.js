

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'method not allowed'})
    }
    console.log(req.body)
}