import mongoose, { Document, Schema } from 'mongoose';

export interface IData extends Document {
    fixture_mid:string,
    season:number,
    fixture_datetime:Date,
    fixture_round:number,
    home_team:string,
    away_team:string,
}

const DataSchema: Schema = new Schema({
    fixture_mid:{ type: String, require: true },
    season:{ type: Number, require:true },
    fixture_datetime:{ type:Date, require:true },
    fixture_round:{type:Number, require: true},
    home_team:{ type: String, require: true },
    away_team: { type: String, require: true },
},{
    timestamps:true
})

const Data = mongoose.models.Data || mongoose.model<IData>('Data', DataSchema);

export default Data;