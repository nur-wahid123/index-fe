"use client";
import { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { Stundent } from "./(objects)/Students";
import { Gender } from "./(objects)/gender.enum";
import { formatDate } from "./(util)/date.util";
import { Father } from "./(objects)/Father";
import { Mother } from "./(objects)/Mother";
import { Guardian } from "./(objects)/Guardian";
import ENDPOINT from "./(config)/url";
import { Subject } from "./(objects)/Subject";

export default function Home() {
  const [files, setFiles] = useState<{ [key: string]: FileList | null }>({
    inputOne: null,
    inputTwo: null,
  });
  const [fileData, setFileData] = useState<Stundent[]>([]);
  const [subject, setSubject] = useState<Subject[]>([]);
  const [chunks, setChunks] = useState<Stundent[][]>([]);
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [inputName]: event.target.files, // Update the corresponding input field in the state
    }));
  };
  useEffect(() => {}, [files]);
  function chunkArray(array: Stundent[], chunkSize: number) {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    console.log(`Total chunks: ${results.length}`);
    return results;
  }

  async function sendData(data: Stundent[], index: number) {
    await fetch(ENDPOINT.STUDENT_CREATE_BATCH, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("success transfer number : ", index));
  }
  async function sendSubjectData(data: Subject[], index: number) {
    await fetch(ENDPOINT.SUBJECT_CREATE_BATCH, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("success transfer number : ", index));
  }
  const handleSendData = () => {
    sendSubjectData(subject, 1);
  };
  async function sendDataInChunks(chunksData: Stundent[][]) {
    for (let i = 0; i < chunksData.length; i++) {
      if (true) {
        const chunk = chunksData[i];
        try {
          await sendData(chunk, i);
        } catch (error) {
          console.error("Error uploading chunk:", error);
        } finally {
          console.log("Chunk sent");
        }
      }
    }
    console.log("Total chunks sent:", chunksData.length);
  }
  const handleDownloadPdf = () => {
    const chunks = chunkArray(fileData, 50);
    setChunks(chunks);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files.inputOne) {
      return;
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(files.inputOne[0]); // Read file as ArrayBuffer for ExcelJS

    reader.onload = async (event) => {
      const buffer = event.target?.result as ArrayBuffer;

      // Create a new workbook instance
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer); // Load the buffer

      const worksheet = workbook.getWorksheet(1); // Get the first sheet
      const rows: Stundent[] = [];

      // Iterate over rows in the worksheet and extract data
      if (worksheet !== undefined) {
        worksheet.eachRow((row, rowIndex) => {
          const rowData = row.values;
          if (Array.isArray(rowData)) {
            if (rowIndex > 6) {
              const student = new Stundent();
              student.name = String(rowData[2]);
              student.studentSchoolId = Number(rowData[3]);
              student.gender = rowData[4] === "L" ? Gender.L : Gender.P;
              student.studentNationalId = String(rowData[5]);
              student.placeOfBirth = String(rowData[6]);
              student.dateOfBirth = formatDate(new Date(String(rowData[7])));
              student.nik = rowData[8] as string;
              student.religion = rowData[9] as string;
              student.address = `${rowData[10]} ${
                rowData[11] !== undefined && rowData[12] !== undefined
                  ? `RT/RW ${rowData[11]}/${rowData[12]}`
                  : ""
              }`; //rowData[9] rowData[10] as string;
              student.hamlet = rowData[13] as string;
              student.ward = rowData[14] as string;
              student.subDistrict = rowData[15] as string;
              student.postalCode = rowData[16] as number;
              student.kindOfStay = rowData[17] as string;
              student.transportation = rowData[18] as string;
              student.telephone = rowData[19] as string;
              student.phoneNumber = rowData[20] as string;
              student.email = rowData[21] as string;
              student.skhun = rowData[22] as string;
              student.isKps = rowData[23] as boolean;
              student.kpsId = rowData[24] as string;
              const father = new Father();
              father.name = rowData[25] as string;
              father.yearOfBirth = rowData[26] as number;
              father.education = rowData[27] as string;
              father.job = rowData[28] as string;
              father.income = rowData[29] as string;
              father.nik = rowData[30] as string;
              student.father = father;
              const mother = new Mother();
              mother.name = rowData[31] as string;
              mother.yearOfBirth = rowData[32] as number;
              mother.education = rowData[33] as string;
              mother.job = rowData[34] as string;
              mother.income = rowData[35] as string;
              mother.nik = rowData[36] as string;
              student.mother = mother;
              const guardian = new Guardian();
              guardian.name = rowData[37] as string;
              guardian.yearOfBirth = rowData[38] as number;
              guardian.education = rowData[39] as string;
              guardian.job = rowData[40] as string;
              guardian.income = rowData[41] as string;
              guardian.nik = rowData[42] as string;
              student.guardian = guardian;
              student.studyGroup = rowData[43] as string;
              student.nationalTestNumber = rowData[44] as string;
              student.graduationSertificateNumber = rowData[45] as string;
              student.isKip = rowData[46] === "Tidak" ? false : true;
              student.kipId = rowData[47] as string;
              student.isNameInKip = rowData[48] === "0" ? false : true;
              student.kksId = rowData[49] as string;
              student.birthCertificateRegistrationId = rowData[50] as string;
              student.bank = rowData[51] as string;
              student.bankAccountNumber = rowData[52] as string;
              student.bankAccountName = rowData[53] as string;
              student.isPipWorthy = rowData[54] === "Tidak" ? false : true;
              student.reasonPipWorthy = rowData[55] as string;
              student.disability = rowData[56] as string;
              student.juniorSchoolName = rowData[57] as string;
              student.childOrder = rowData[58] as number;
              student.latitude = `${rowData[59]}` as string;
              student.longitude = `${rowData[60]}` as string;
              student.familyCardId = rowData[61] as string;
              student.weight = rowData[62] as number;
              student.height = rowData[63] as number;
              student.headCircumference = rowData[64] as number;
              student.numberOfSiblings = rowData[65] as number;
              student.distanceFromSchool = rowData[66] as number;
              rows.push(student);
            }
          }
        });
      }
      setFileData(rows);
      console.log("success read file");
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };
  const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files.inputTwo) {
      return;
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(files.inputTwo[0]);
    reader.onload = async (event) => {
      if (event.target) {
        const buffer = event.target?.result as ArrayBuffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer); // Load the buffer
        const worksheet = workbook.getWorksheet(1); // Get the first sheet
        if (worksheet) {
          const rows: Subject[] = [];
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
              const rowData = row.values;
              if (Array.isArray(rowData) && rowData.length > 0) {
                const subject = new Subject();
                subject.name = rowData[1] as string;
                rows.push(subject);
              }
            }
          });
          const uniqueData = rows.filter((item, index, array) => {
            return (
              index ===
              array.findIndex(
                (obj) => obj.name.toLowerCase() === item.name.toLowerCase()
              )
            );
          });
          setSubject(uniqueData);
          console.log("success read file");
        }
      }
    };
  };
  return (
    <div>
      <form
        className=" max-w-xl flex flex-col gap-3"
        onSubmit={handleSubmit}
        method="post"
      >
        <label className="label" htmlFor="file">
          Daftar Peserta Didik
        </label>
        <input
          type="file"
          name="file"
          accept=".xls,.xlsx"
          className="file-input file-input-bordered"
          id="file"
          onChange={(e) => handleFileChange(e, "inputOne")}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <button onClick={handleDownloadPdf} className="btn btn-primary">
        Seperate Student into Chunk
      </button>
      <form
        className=" max-w-xl flex flex-col gap-3"
        onSubmit={handleSubmit2}
        method="post"
      >
        <label className="label" htmlFor="file">
          Daftar Mata Pelajaran
        </label>
        <input
          type="file"
          name="file"
          accept=".xls,.xlsx"
          className="file-input file-input-bordered"
          id="file"
          onChange={(e) => handleFileChange(e, "inputTwo")}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <button className="btn btn-success" onClick={handleSendData}>
        Input to Database
      </button>
      <div>
        {chunks.map((chunk, index) => (
          <div key={index}>
            <p>Chunk {index}</p>
            <button className="btn" onClick={() => sendData(chunk, index)}>
              Send Data
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
