import Box from "@/components/ui/Box";
import Divider from "@/components/ui/Divider";
import Text from "@/components/ui/Text";
import Topbar from "@/components/ui/Topbar";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Topbar goBack title={t("privacyPolicy", "Privacy Policy")} />
      <ScrollView>
        <Box px="m" py="xl">
          <Text variant="title">Informativa sul trattamento dei dati personali</Text>
          <Text variant="secondary">
            Ai sensi e per gli effetti dell’art. 13 del Regolamento UE n. 2016/679
          </Text>
          <Text variant="body" mt="s">
            App Attivati!
          </Text>

          <Text variant="title" my="m">
            Introduzione
          </Text>
          <Text variant="body">
            Benvenuto! Questa è l'informativa sulla privacy di “Attivati!”, l'app per il
            volontariato in Trentino (che da qui in poi chiameremo solo: “App”). L'App ti aiuta a
            trovare attività di volontariato che potrebbero piacerti e ti mette in contatto con le
            organizzazioni che le offrono.
          </Text>

          <Text variant="subtitle">Cosa troverai in questo documento?</Text>
          <Text variant="body">
            Ti spiegheremo come e perché raccogliamo e usiamo i tuoi dati personali quando utilizzi
            l’App e come puoi fare per modificarli o cancellarli se vuoi. È importante leggere tutto
            con attenzione.
          </Text>

          <Text variant="subtitle">
            Alcune definizioni utili per comprendere a pieno il documento
          </Text>

          <Text variant="subtitle">GDPR</Text>
          <Text variant="body">
            Il GDPR è una legge europea che serve a proteggere la tua privacy e a regolare come
            vengono trattati i tuoi dati personali) soprattutto da parte delle aziende ma non solo).
          </Text>

          <Text variant="subtitle">Dato personale</Text>
          <Text variant="body">
            Qualsiasi informazione che permette di identificare, direttamente (come il tuo nome ed
            il tuo cognome) o indirettamente (il tuo codice fiscale) una persona. In altre parole, i
            tuoi dati personali rivelano informazioni su di te.
          </Text>

          <Text variant="subtitle">Trattamento di dati personali</Text>
          <Text variant="body">
            Qualsiasi operazione effettuata sui tuoi dati. Come, ad esempio, la raccolta,
            l’organizzazione, la cancellazione, la modifica, la rielaborazione, la conservazione.
          </Text>

          <Text variant="subtitle">Titolare del trattamento</Text>
          <Text variant="body">
            E’ chi decide cosa fare con i tuoi dati personali. Decide: perché i dati vengono
            raccolti, come e dove devono essere conservati o comunicati, per quanto tempo devono
            essere conservati ecc.
          </Text>

          <Text variant="subtitle">Data Protection Officer</Text>
          <Text variant="body">
            Il responsabile della protezione dati (“DPO”) è la persona incaricata di controllare che
            tutto venga fatto seguendo le leggi sulla protezione dei dati.
          </Text>

          <Text variant="subtitle">Finalità del trattamento</Text>
          <Text variant="body">
            Lo scopo per cui i dati personali sono trattati. Ad esempio, i dati possono essere
            trattati per offrire un servizio oppure per inviare materiale promozionale.
          </Text>

          <Text variant="subtitle">Base giuridica</Text>
          <Text variant="body">
            La base giuridica è la giustificazione legale per cui un'azienda o un'organizzazione può
            raccogliere e utilizzare i tuoi dati personali. È come un "permesso" che autorizza il
            trattamento dei tuoi dati.
          </Text>

          <Text variant="subtitle">Categorie particolari di dati personali (o dati sensibili)</Text>
          <Text variant="body">
            I dati personali sensibili includono informazioni relative alla salute, all'etnia, alle
            opinioni politiche, alle convinzioni religiose, all'appartenenza sindacale,
            all'orientamento sessuale o ai precedenti penali. Vi chiediamo di non condividere alcun
            dato personale sensibile sulla nostra app.
          </Text>

          <Text variant="subtitle">Responsabili del trattamento</Text>
          <Text variant="body">
            I soggetti che si occupano di alcune attività di trattamento su indicazione e per conto
            del Titolare del trattamento.
          </Text>

          <Divider my="m" />

          <Text variant="title" my="m">
            Titolarità del trattamento
          </Text>
          <Text variant="body">
            Quando utilizzi l’applicazione mobile “Attivati!” (di seguito “l’app”), i tuoi dati sono
            gestiti da:
          </Text>

          <Text variant="body" my="m">
            CSV Trentino – Non profit network ETS (“CSV”) e Comitato Trento Capitale Europea del
            Volontariato 2024 ETS (“Comitato”)
          </Text>

          <Text variant="title" my="m">
            Data Protection Officer
          </Text>
          <Text variant="body">
            Abbiamo nominato un DPO. Se hai domande specifiche sul trattamento dei tuoi dati, puoi
            contattarlo in qualsiasi momento scrivendo a csv-tn-dpo@chino.io.
          </Text>

          <Divider my="m" />

          <Text variant="title">Perché raccogliamo i tuoi dati?</Text>
          <Text variant="subtitle">A. Offrirti l’App e le sue funzionalità</Text>
          <Text variant="body">
            Raccogliamo i tuoi dati per offrirti l’App e le sue funzionalità. Questo include:
          </Text>
          <Box gap="s">
            <Text variant="body">Registrazione del volontario in app;</Text>
            <Text variant="body">Log-in del volontario;</Text>
            <Text variant="body">Modifica dei dati e gestione del profilo;</Text>
            <Text variant="body">
              Gestione della candidatura per partecipazione ad attività di volontariato;
            </Text>
            <Text variant="body">
              Comunicazione della disponibilità del volontario e dei suoi dati agli Enti che hanno
              proposto l’iniziativa;
            </Text>
            <Text variant="body">
              Gestione della sicurezza e garanzia del corretto funzionamento dell’applicazione.
            </Text>
          </Box>

          <Text variant="subtitle">Base giuridica</Text>
          <Text variant="body">
            La base giuridica che ci legittima a trattare i tuoi dati è l’articolo 6(1)(b) del GDPR
            - Esecuzione di un contratto. In altre parole trattiamo i tuoi dati per offrirti un
            servizio che tu stesso ci hai richiesto.
          </Text>

          <Text variant="subtitle">Dati trattati per questa finalità</Text>
          <Text variant="body">
            La base giuridica che ci legittima a trattare i tuoi dati è l’articolo 6(1)(b) del GDPR
            - Esecuzione di un contratto. In altre parole trattiamo i tuoi dati per offrirti un
            servizio che tu stesso ci hai richiesto.
          </Text>
          <Box gap="s">
            <Text variant="body">Dati identificativi * (quali nome, cognome);</Text>
            <Text variant="body">Dati di contatto * (indirizzo email)</Text>
            <Text variant="body">Dati pseudo-identificativi * (codice fiscale);</Text>
            <Text variant="body">Caratteristiche personali (data di nascita, lingue parlate);</Text>
            <Text variant="body">Dati demografici (città di residenza);</Text>
            <Text variant="body">
              Dati relativi all’educazione, alla professione e all’impiego (professione esercitata);
            </Text>
            <Text variant="body">Immagini (foto profilo);</Text>
            <Text variant="body">Dati d’uso (dati di navigazione);</Text>
            <Text variant="body">
              Altri dati (dati inseriti nello spazio note, dati gps, candidatura attività di
              volontariato, preferenze per attività di volontariato).
            </Text>
          </Box>

          <Text variant="subtitle">E’ necessario fornire i dati? </Text>
          <Text variant="body">
            Il conferimento delle tipologie di dati indicate sopra con “*” è obbligatorio. La
            mancata fornitura di tali dati comporterà l'impossibilità di concludere e di dare
            esecuzione al contratto e dunque di procedere con il servizio richiesto. In altre
            parole, non ti sarà possibile utilizzare l’App se non inserisci almeno i dati indicati
            con “*” I restanti dati sono facoltativi e puoi scegliere liberamente di inserirli o
            meno. I dati d’uso vengono invece raccolti automaticamente quando utilizzi
            l’applicazione.
          </Text>

          <Divider my="m" />

          <Text variant="subtitle">B. Marketing diretto</Text>

          <Text variant="body">
            Svolgiamo le attività elencate in questa tabella per inviarti, su tua richiesta,
            informazioni sulle nostre attività, eventi e servizi e sulle attività promosse dagli
            Enti Non Profit che collaborano con noi.
          </Text>

          <Box gap="s">
            <Text variant="body">
              Invio di comunicazioni su prodotti, servizi o eventi offerti da noi o dai nostri
              partner, compresa la nostra newsletter.
            </Text>
          </Box>

          <Text variant="subtitle">Base giuridica</Text>
          <Text variant="body">
            La base giuridica che ci legittima a trattare i tuoi dati è l’articolo 6(1)(a) del GDPR
            - Consenso.
          </Text>

          <Text variant="subtitle">Dati trattati per questa finalità</Text>
          <Text variant="body">
            La base giuridica che ci legittima a trattare i tuoi dati è l’articolo 6(1)(b) del GDPR
            - Esecuzione di un contratto. In altre parole trattiamo i tuoi dati per offrirti un
            servizio che tu stesso ci hai richiesto.
          </Text>
          <Box gap="s">
            <Text variant="body">Dati identificativi * (quali nome, cognome);</Text>
            <Text variant="body">Dati di contatto * (indirizzo email)</Text>
          </Box>

          <Text variant="subtitle">E’ necessario fornire i dati? </Text>
          <Text variant="body">
            No. Tratteremo i tuoi dati per questa finalità solo se ci darai il tuo consenso che
            potrai revocare in qualsiasi momento scrivendoci a privacy@volontariatotrentino.it
            oppure utilizzando gli appositi link presenti in fondo alle comunicazioni promozionali.
          </Text>

          <Divider my="m" />

          <Text variant="subtitle">C. Altre finalità </Text>
          <Text variant="subtitle">Finalita</Text>
          <Box gap="s">
            <Text variant="body">
              Rispondere ad ordini e richieste legittime provenienti da Autorità Pubbliche.
            </Text>
          </Box>

          <Text variant="subtitle">Base giuridica</Text>
          <Text variant="body">
            La base giuridica è data da eventuali obblighi di legge - 6(1)(c) del GDPR.
          </Text>

          <Text variant="subtitle">Dati trattati per questa finalità</Text>
          <Text variant="body">Tutti i dati eventualmente richiesti dall’Autorità Pubblica.</Text>

          <Text variant="subtitle">Finalita</Text>
          <Box gap="s">
            <Text variant="body">
              Gestione di eventuali contenziosi davanti alle autorità competenti e difesa dei nostri
              diritti.
            </Text>
          </Box>

          <Text variant="subtitle">Base giuridica</Text>
          <Text variant="body">
            La base giuridica potrebbe essere data da un obbligo di legge - 6(1)(c) del GDPR o da un
            nostro interesse legittimo (6(1)(f) GDPR) relativo alla gestione di eventuali
            contenziosi e alla difesa dei nostri diritti.
          </Text>

          <Text variant="subtitle">Dati trattati per questa finalità</Text>
          <Text variant="body">
            Tutti i dati necessari per la gestione di eventuali contenziosi e per la difesa dei
            nostri diritti.
          </Text>

          <Divider my="m" />

          <Text variant="title" my="m">
            Categorie particolari di dati personali
          </Text>
          <Text variant="body">
            Non trattiamo dati sensibili che ti riguardano. Infatti, la nostra applicazione non
            richiede in nessun momento l’inserimento di alcun dato sensibile. Ti invitiamo quindi a
            non condividere in nessun caso dati personali di questa natura sulla nostra
            applicazione.
          </Text>

          <Text variant="title" my="m">
            Dati giudiziari e dati relativi a condanne penali
          </Text>
          <Text variant="body">
            Non trattiamo dati giudiziari e dati relativi a condanne penali. Anche in questo caso,
            ti invitiamo a non condividere con noi dati personali di questa natura.
          </Text>

          <Text variant="title" my="m">
            Cookies e tecnologie simili
          </Text>
          <Text variant="body">
            I cookie e tecnologie simili come i pixel o i tag (parliamo genericamente di "cookie")
            sono piccoli file o segmenti di codice che possono raccogliere informazioni sugli utenti
            quando questi navigano su un sito web o un’applicazione (mobile o web). I cookie vengono
            memorizzati sui dispositivi degli utenti per un determinato periodo e hanno diverse
            funzionalità. La nostra applicazione utilizza solamente cookie di natura strettamente
            tecnica, che servono a facilitare o migliorare l’esperienza di navigazione. Non
            utilizziamo i cookie per tracciare la tua attività o per creare profili personalizzati a
            fini pubblicitari. Per questa ragione, non siamo obbligati a chiederti il consenso
            all’utilizzo dei cookie
          </Text>

          <Text variant="title" my="m">
            Come raccogliamo i tuoi dati
          </Text>
          <Text variant="body">
            Raccogliamo i tuoi dati quando interagisci con la nostra applicazione e con noi. In
            particolare, raccogliamo i tuoi dati personali quando:
          </Text>
          <Box gap="s">
            <Text variant="body">
              1) Ti registri sull’applicazione e la utilizzi, inserendo i tuoi dati personali e
              richiedendo di partecipare alle attività di volontariato;
            </Text>
            <Text variant="body">
              2) Ci contatti per chiederci aiuto o informazioni o per lasciarci un feedback;
            </Text>
            <Text variant="body">
              3) Navighi sull’applicazione (dati di navigazione, raccolti in modo automatico per far
              funzionare l’applicazione stessa).
            </Text>
          </Box>
          <Text variant="title" my="m">
            Condivisione dei tuoi dati
          </Text>
          <Text variant="body">
            In generale, condivideremo i tuoi dati personali solo al fine di offrirti la possibilità
            di utilizzare la nostra applicazione, come specificato nei Termini e Condizioni di
            servizio.
          </Text>

          <Box gap="s">
            <Text variant="subtitle">a. Organizzazioni aderenti all’app</Text>
            <Text variant="body">
              Nel momento in cui chiedi di partecipare ad una attività di volontariato presente
              sull’App, i tuoi dati personali saranno comunicati all’Ente Non Profit che promuove
              tale attività. I tuoi dati personali vengono comunicati all’Ente al fine di gestire la
              tua “candidatura” e valutare la tua compatibilità con le esigenze dell’Ente. Da quel
              momento in poi, l’organizzazione che valuta la tua candidatura, sarà qualificata come
              “autonomo titolare del trattamento”. In altre parole, significa che tale
              organizzazione deciderà in autonomia come e perché trattare i tuoi dati e sarà
              direttamente responsabile della protezione degli stessi. Potrai chiedere all’Ente così
              individuato maggiori informazioni relativamente al trattamento dei tuoi dati.
            </Text>
            <Text variant="subtitle">b. Responsabili del trattamento</Text>
            <Text variant="body">
              Avremo bisogno di affidare la gestione di alcune attività (e dei tuoi dati) ad aziende
              specializzate (come quelle che gestiscono i server o conservano i dati per conto
              nostro). In questi casi, ci assicuriamo che queste aziende trattino i tuoi dati con la
              massima riservatezza e sicurezza (Art. 28 GDPR).
            </Text>
            <Text variant="subtitle">c. c. Autorità pubbliche</Text>
            <Text variant="body">
              Potremmo aver bisogno di condividere i tuoi dati con Autorità Pubbliche che ne
              facciano legittima richiesta, in adempimento ad obblighi nazionali e/o internazionali.
            </Text>
            <Text variant="subtitle">b. d. Condivisione tra contitolari</Text>
            <Text variant="body">
              In quanto contitolari, Comitato e CSV condividono la titolarità dei dati personali di
              “Attivati!”, al fine comune di fornirti un’App completa e funzionante.
            </Text>
          </Box>

          <Text variant="title" my="m">
            Trasferimento dei dati al di fuori dell’UE/SEE
          </Text>
          <Text variant="body">
            L’Unione europea è particolarmente attenta alla protezione dei dati personali delle
            persone che si trovano in Europa. Per questo motivo, i dati personali possono essere
            trasmessi (“inviati”) al di fuori dell’Europa e dello Spazio Economico Europeo solo in
            determinate circostanze e comunque solo seguendo quanto stabilito dal GDPR. Quando
            utilizzi l’applicazione, i tuoi dati personali saranno trattati all'interno dell'Unione
            Europea e dello Spazio Economico Europeo. Dovesse rendersi necessario un trasferimento
            dei tuoi dati al di fuori dell’Unione Europea lo faremo solo nel rispetto delle modalità
            previste dal GDPR stesso. Per ulteriori dettagli sui trasferimenti puoi contattare il
            nostro DPO in qualsiasi momento.
          </Text>
          <Text variant="title" my="m">
            Conservazione dei dati personali
          </Text>
          <Text variant="body">
            Conserveremo i tuoi dati personali per il tempo necessario a fornirti il servizio che ci
            stai richiedendo (App “Attivati!”). In altre parole, conserveremo i tuoi dati personali
            finché il tuo account non verrà cancellato. In alcuni casi potremmo conservare più a
            lungo i tuoi dati. Questo potrebbe avvenire in particolare nel caso di azioni legali o
            controversie relative ai nostri rapporti contrattuali esistenti. Quando i tuoi dati
            personali sono trattati sulla base del consenso, i dati saranno trattati fino alla
            revoca del consenso (nel tuo caso questo può accadere per l’invio della newsletter e di
            comunicazioni promozionali). Se i dati personali non sono più necessari per le finalità
            o per gli interessi legittimi da noi perseguiti e non si applica nessun'altra base
            giuridica, cancelleremo i tuoi dati.
          </Text>
          <Text variant="title" my="m">
            I tuoi diritti
          </Text>
          <Box gap="s">
            <Text variant="body">
              Sapere se i tuoi dati personali sono o meno in fase di trattamento e, in caso
              affermativo, richiederne l'accesso o richiedere delle copie dei tuoi dati personali.
              Puoi inoltre chiederci ulteriori informazioni relative alla presente Informativa
              (Diritto di accesso);
            </Text>
            <Text variant="body">
              Chiederci di correggere le informazioni che ritieni inaccurate. Hai anche il diritto
              di chiederci di completare le informazioni che ritieni incomplete. Ricorda comunque
              che puoi modificare i tuoi dati all’interno dell’apposita sezione dell’App (Diritto di
              rettifica);
            </Text>
            <Text variant="body">
              Chiederci di cancellare i tuoi dati personali in determinate circostanze (Diritto
              all'oblio);
            </Text>
            <Text variant="body">
              Opporti al trattamento dei dati personali, per motivi connessi alla tua situazione
              specifica (Diritto di opposizione);
            </Text>
            <Text variant="body">
              Non essere sottoposto a decisioni automatizzate, inclusa la profilazione. Ti
              ricordiamo che, come già detto sopra, la nostra App non utilizza processi decisionali
              automatizzati (Diritti relativi al processo decisionale automatizzato individuale,
              inclusa la profilazione);
            </Text>
            <Text variant="body">
              Revocare il consenso dato in qualsiasi momento (Diritto di revoca del consenso);
            </Text>
            <Text variant="body">
              Ricevere i dati personali in un formato standard nel caso in cui desideri trasferirli
              a un altro titolare del trattamento (Diritto alla portabilità dei dati);
            </Text>
            <Text variant="body">
              Presentare un reclamo in qualsiasi momento all'Autorità Garante per la protezione dei
              dati personali, in caso di violazione dei diritti di protezione dei dati (Diritto di
              proporre reclamo ad un'autorità di controllo);
            </Text>
            <Text variant="body">
              Chiederci di limitare il trattamento delle tue informazioni in determinate circostanze
              (Diritto di limitazione del trattamento);
            </Text>
            <Text variant="body">
              Chiederci maggiori informazioni sul rapporto di contitolarità tra Comitato e CSV, in
              particolare per quanto riguarda il contenuto essenziale del contratto che lo regola;
            </Text>
            <Text variant="body">
              Richiedere che le suddette modifiche siano comunicate ad altre parti a cui sono stati
              comunicati i dati.
            </Text>
          </Box>
          <Text variant="body">
            L'esercizio dei diritti non è soggetto ad alcun vincolo di forma ed è gratuito. Puoi
            esercitare i tuoi diritti contattandoci al seguente indirizzo:
            privacy@volontariatotrentino.it.
          </Text>
          <Text variant="title" my="m">
            Contatti
          </Text>
          <Text variant="subtitle" my="m">
            CSV Trentino – Non profit network ETS (“CSV”)
          </Text>
          <Box gap="s">
            <Text variant="body">Via Renato Lunelli, 4 - 38121 Trento</Text>
            <Text variant="body">Telefono 0461.916604</Text>
            <Text variant="body">Email: privacy@volontariatotrentino.it</Text>
            <Text variant="body">C.F. 96061940225 - P. IVA 01852790227.</Text>
          </Box>
          <Text variant="subtitle" my="m">
            Comitato Trento Capitale Europea del Volontariato 2024 ETS (“Comitato”)
          </Text>
          <Box gap="s">
            <Text variant="body">Via Renato Lunelli, 4 - 38121 Trento</Text>
            <Text variant="body">E-mail: info@trentovolo.capital</Text>
            <Text variant="body">C.F. 96121400228.</Text>
          </Box>
          <Text variant="title" my="m">
            Aggiornamento dell’informativa
          </Text>
          <Text variant="body">
            Il documento che hai appena letto può essere modificato e rivisto. Eventuali modifiche a
            questa Informativa verranno pubblicate nell’apposita sezione dell’App e, se necessario,
            ti verranno comunicate. Ti invitiamo a consultare periodicamente la nostra Informativa
            in modo da essere sempre informato su come trattiamo i tuoi dati personali.
          </Text>
          <Text variant="body" mt="s">
            Ultimo aggiornamento: 23.09.2024
          </Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
