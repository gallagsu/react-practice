'use client';
import TextField from "../components/TextField.js";
import {Label} from "../components/TextField.js";
import {Input} from "../components/TextField.js";

export default function Home() {

  return (
    <main>
      <form>
      <h1>Textfield Using Context Provider</h1>
      <p>Passing in label text to textfield component and auto-generating a unique id to be used to link the label and input field.</p>
        <TextField>
          <Label>First name</Label>
          <Input /> 
        </TextField>

        <TextField>
          <Label>Last name</Label>
          <Input /> 
        </TextField>
      </form>
    </main>
  );
}
