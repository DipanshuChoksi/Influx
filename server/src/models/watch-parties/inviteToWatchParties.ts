import { model, Schema } from 'mongoose';

const InviteToWatchParties = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    watchParty: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const InviteToWatchPartiesModel = model('InviteToWatchParties', InviteToWatchParties);

export default InviteToWatchPartiesModel;
