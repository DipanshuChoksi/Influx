import { model, Schema } from 'mongoose';

const watchPartySchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: false,
    },
    mediaTitle: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'ended'],
      default: 'active',
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model('WatchParties', watchPartySchema);
