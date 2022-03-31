import React from 'react';
import ReactDOM from 'react-dom';
import { PensilService, UIKit } from '@pensil-inc/web-sdk';
import '@pensil-inc/web-sdk/lib/esm/styles/index.css';

// this file is meant for testing the sdk only

const pensil = new PensilService({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVWZXJpZmljYXRpb24iOnsiY291bnRyeUNvZGUiOiIrOTEifSwidGl0bGUiOiIiLCJjb3VudHJ5Q29kZSI6Iis5MSIsImlzVmVyaWZpZWQiOnRydWUsImlzVmVyaWZpZWRCeVBlbnNpbCI6ZmFsc2UsImZvbGxvd2VycyI6MCwiZm9sbG93aW5nIjowLCJyb2xlIjoidXNlciIsImxhc3RMb2dpbkRhdGUiOiIyMDIyLTAzLTIyVDAxOjU3OjQzLjIzMVoiLCJ0YWdzIjpbXSwiZXhhbXMiOltdLCJjb21tdW5pdHlUeXBlU2VsZWN0aW9uIjoiIiwiYWZmaWxpYXRlZENvbW11bml0eSI6bnVsbCwibmFtZSI6IlNodWJoYW0gU2luZ2ggQ2hhaGFyIiwibW9iaWxlIjoiODIxODU3ODQ5OSIsInVzZXJJZCI6InNodWJoYW0xMzM5IiwiY3JlYXRlZEF0IjoiMjAyMi0wMi0xOFQwOTo1MzoyNi4yOTJaIiwidXBkYXRlZEF0IjoiMjAyMi0wMy0yMlQwMTo1Nzo0My4yMzJaIiwib3RwIjpudWxsLCJwaWN0dXJlIjoidXNlcl80LnBuZyIsImJlaGFuY2VMaW5rIjoiIiwiYmlvIjoiIiwiZHJpYmJibGVMaW5rIjoiIiwiZmFjZWJvb2tMaW5rIjoiIiwiaW5zdGFncmFtTGluayI6IiIsImxpbmtlZGluTGluayI6IiIsInBpbnRyZXN0TGluayI6IiIsInR3aXR0ZXJMaW5rIjoiIiwieW91dHViZUxpbmsiOiIiLCJlbWFpbCI6ImNoYWhhcnNodWJoYW1zaW5naEBnbWFpbC5jb20iLCJpZCI6IjYyMGY2Yzk2MDcxNjY2MTFlNDIyMTc5MyIsImlhdCI6MTY0NzkxNDI2M30.pZEDviLlC-PqmkFPQqiKkuI2BY_7fKZBdPy0lkP41vk",
    baseUrl: "http://localhost:3000/api/",
    themeData: {
        primaryColor: "red",
    }
});

ReactDOM.render(
    <React.StrictMode>
        <UIKit.SectionDetail service={pensil} groupId="620f6cb107166611e42217b2" sectionId="620f6cb107166611e42217b3" />
    </React.StrictMode>,
    document.getElementById('root')
);
