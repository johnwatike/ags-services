/**
 * The AGS wordmark, taken from ag-services.org.
 * logo.png carries a black wordmark on white, so it only works on a light
 * ground; logofooter.png is the transparent white version for dark grounds and
 * for the nav while it floats over the home hero.
 */
export default function Mark({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <img className="foot-logo" src="/assets/logofooter.png" width={250} height={99}
           alt="AGS — Africa Geophysical Services" />
    );
  }
  return (
    <>
      <img className="brand-logo on-light" src="/assets/logo.png" width={259} height={95}
           alt="AGS — Africa Geophysical Services" />
      <img className="brand-logo on-dark" src="/assets/logofooter.png" width={250} height={99}
           alt="" aria-hidden="true" />
    </>
  );
}
