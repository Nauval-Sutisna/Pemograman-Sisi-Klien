// JSON = isinya object atau array atau keduanya
// Buat object data diri mahasiswa

const mahasiswa = {
    nama: "Mahendra",
    nim: "A11.2022.14638",
    umur: 21,
    status: true,
    hobby: ["game", "mancing", "pppp"],
    matkul: [
        {
            matkulid: 4301,
            matkulNama: 'pemsik',
            sks: 3,
            nilai: 80
        },
        {
            matkulid: 4504,
            matkulNama: 'Daspro',
            sks: 3,
            nilai: 85
        }
    ],
    organisasi: "HIMATIF"
};

// 1. ctrl + shift + p 
// 2. ketik quokka, pilih start on current file

console.log(mahasiswa);

// ES6 - Destructuring Object
const { nama, nim, status, hobby, matkul, organisasi } = mahasiswa;
console.log("Nama saya: " + nama + ' - ' + nim);

// Destructuring Array
const [hobi1, hobi2] = hobby;
console.log("Hobby sumber cuanku: - " + hobi1 + " - dan - " + hobi2);

// Template Literal
console.log(`Hobby sumber cuanku: - ${hobi1} dan ${hobi2}`);

// Spread Operator
const menuHobby = "buzzer";
const updateHobby = [...hobby, menuHobby, "game", "mancing"]; // add to array
console.log(`Menginfo hobby 2025 : ${updateHobby.join(", ")}`);

// Function
// Cara lama
function sumbe(a, b) {
    return a + b;
}

// Cara baru (arrow function)
const jumlah = (a, b) => a + b;
console.log(`Berhitung yuk 1 + 2 = ${jumlah(1, 2)}`);

// Logika dengan OR (||)
const statusMhs = mahasiswa.organisasi || "Tidak ikut organisasi";
console.log(`Status organisasi: ${statusMhs}`);

// Tambahan: Hitung total SKS dan rata-rata nilai
let totalSKS = 0;
let totalNilai = 0;

matkul.forEach(mk => {
    totalSKS += mk.sks;
    totalNilai += mk.nilai;
});

const rataNilai = totalNilai / matkul.length;
console.log(`Total SKS: ${totalSKS}, Rata-rata nilai: ${rataNilai}`);

// ES6 - Array Method (map, filter, reduce)
const namaMatkul = matkul.map((m) => m.matkulNama);
console.log(namaMatkul); // Output: ['pemsik', 'Daspro']

// Array of Object: List Mahasiswa
const listMhs = [
    { nim: '2012', nama: 'Mahendra', status: true },
    { nim: '2014', nama: 'budi', status: true },
    { nim: '2013', nama: 'rudi', status: false }
];

// Tambahan contoh: filter yang statusnya true
const aktifMhs = listMhs.filter(mhs => mhs.status === true);
console.log("Mahasiswa aktif:", aktifMhs.map(m => m.nama));

const totalSks = mahasiswa.matkul.reduce((total, m) => total + m.sks, 0);
console.log(`Total SKS mahasiswa: ${totalSks}`);


