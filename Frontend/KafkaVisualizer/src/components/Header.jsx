export default function Header({ activeMenu }) {
    return (
        <header className="bg-slate-800 text-gray-300 p-4 m-1 flex items-center justify-center rounded-xl">
            <h1 className="text-green-400 text-xl font-semibold">{activeMenu}</h1>
        </header>
    );
}