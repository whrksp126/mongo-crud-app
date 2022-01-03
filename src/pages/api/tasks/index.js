import Task from '../../../model/Task';
import { dbConnect, runMiddleware } from '../../../utils/index';
import Morgan from 'morgan';

dbConnect();

const index = async (req, res) => {
  const {method, body} = req;
  const morgan = Morgan('dev');
  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(tasks);
      } catch(err) {
        return res.status(400).json({msg: err.message});
      }
    case "POST":
      try {
        const newTask = new Task(body);
        const saveTask = await newTask.save();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(saveTask);
      } catch (err) {
        return res.status(400).json({msg: err.message});
      }
    default: return res.status(400).json({msg: "이 방법은 지원되지 않습니다"})
  }
};

export default index