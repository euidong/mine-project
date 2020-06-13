import "./env";
import express from "express";
import logger from "morgan";
import cors from "cors";
import db from "../model";


const app = express();

app.set('port', process.env.PORT || 8000);
app.use(express.json());
app.use(cors());

db.sequelize.sync()
.then(() => {
    console.log('✅ DB connection success.');
})
.catch(err => {
    console.log(err);
    console.log('🚫 DB connection error.');
    console.log('  If this atempt is frist, please Retry!');
});



app.post('/record/upload', async (req, res) => {
    try {
        await db.Record.create({
            nickName: req.body.nickName,
            time: req.body.time,
            width: req.body.width,
            height: req.body.height,
            minePercent: req.body.minePercent
        });
        res.send('success');
    }catch(err){
        res.send('error');
    }
});

app.get('/record/list', async (req, res) => {
    const a = await db.Record.findAll({
        attributes: ['nickName', 'time', 'createdAt'],
        order: [
            'width',
            'height',
            'minePercent',
            'time',
            'createdAt'
        ],
        where: {
          width: req.query.width,
          height: req.query.height,
          minePercent: req.query.minePercent
        }
    });
    res.send(a);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 대기 중');
});