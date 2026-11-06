import type { Vacature } from '@/lib/vacature/schema';

type VacatureKaartProps = {
    vacature: Vacature;
    onSluiten: () => void;
};

export default function VacatureKaart({ vacature, onSluiten }: VacatureKaartProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold">Geanalyseerde vacature</h2>
                <button
                    type="button"
                    onClick={onSluiten}
                    className="text-sm text-gray-500 underline hover:text-gray-700"
                >
                    Sluiten
                </button>
            </div>

            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                <dt className="font-semibold">Functietitel</dt>
                <dd>{vacature.functietitel}</dd>

                <dt className="font-semibold">Bedrijf</dt>
                <dd>{vacature.bedrijf ?? 'Onbekend'}</dd>

                <dt className="font-semibold">Niveau</dt>
                <dd>{vacature.niveau}</dd>

                <dt className="font-semibold">Minimumsalaris</dt>
                <dd>{vacature.salarisMin === null ? 'Niet vermeld' : `€ ${vacature.salarisMin}`}</dd>

                <dt className="font-semibold">Vaardigheden</dt>
                <dd>{vacature.vaardigheden.length > 0 ? vacature.vaardigheden.join(', ') : 'Geen'}</dd>

                <dt className="font-semibold">Thuiswerken</dt>
                <dd>{vacature.remote ? 'Ja' : 'Nee'}</dd>
            </dl>
        </div>
    );
}
