import {Schema, model, models} from 'mongoose'

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '작업 제목은 필수 항목입니다.'],
      unique: true,
      trim: true,
      maxlength: [40, '제목은 40자를 초과할 수 없습니다.'],
    },
    description: {
      type: String,
      required: [true, '작업 설명은 필수 항목입니다.'],
      trim: true,
      maxlength: [200, '설명은 200자를 초과할 수 없습니다.'],
    },
    memo: {
      type: String,
      trim: true,
      default: "",
      maxlength: [200, '설명은 200자를 초과할 수 없습니다.'],
    },
    status: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default models.Task || model('Task', TaskSchema) 