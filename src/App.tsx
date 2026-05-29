import { useState } from "react";
import type { MouseEvent, CSSProperties } from "react";
import "./styles.css";

const rooms = [
  "Plenitude",
  "Eni",
  "Adidas",
  "Lenovo",
  "La Rinascente",
  "Lilt",
  "3D Stuff",
];

const plenitudeProjects = [
  "Campagna lancio fibra",
  "Design system",
  "Campagna 2024",
];

const adidasProjects = ["Home kit", "Away kit", "Third kit"];

const rinascenteProjects = [
  "Campagna 2026",
  "Diabolik - Colpo alla Rinascente",
];

const liltProjects = ["Fallo per la tua salute", "Controllo palla"];

const threeDProjects = [
  {
    name: "HATCHI!",
    subtitle: "TOY DESIGN",
    link: "https://www.behance.net/gallery/249994997/Hatchi-Personal-Project-Toy-Design",
  },
  {
    name: "SISTERS",
    subtitle: "3D CHARACTERS",
    link: "https://www.behance.net/gallery/246097975/Sisters",
  },
  {
    name: "EMOTIONAL CIRCUIT",
    subtitle: "3D EXPERIMENT",
    link: "https://www.behance.net/gallery/210645511/Emotional-Circuit",
  },
  {
    name: "HEAD IN THE CLOUDS",
    subtitle: "3D VISUAL",
    link: "https://www.behance.net/gallery/121628731/Head-In-the-clouds",
  },
  {
    name: "LEVEL UP",
    subtitle: "3D PROJECT",
    link: "https://www.behance.net/gallery/66536715/Level-Up",
  },
  {
    name: "INSERT COIN",
    subtitle: "3D PROJECT",
    link: "https://www.behance.net/gallery/222738787/Insert-Coin",
  },
];

type Screen =
  | "entrance"
  | "lobby"
  | "room"
  | "adidasRoom"
  | "eniRoom"
  | "lenovoRoom"
  | "rinascenteRoom"
  | "liltRoom"
  | "threeDRoom";

type Explosion = {
  id: number;
  x: number;
  y: number;
};

type BallShot = {
  id: number;
  x: number;
  y: number;
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("entrance");

  const [plenitudeEnemies, setPlenitudeEnemies] = useState([1, 2, 3, 4]);
  const [adidasTargets, setAdidasTargets] = useState([1, 2, 3]);

  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [ballShots, setBallShots] = useState<BallShot[]>([]);

  const plenitudeIsLocked = plenitudeEnemies.length > 0;
  const adidasIsLocked = adidasTargets.length > 0;

  const enterRoom = (room: string) => {
    setExplosions([]);
    setBallShots([]);

    if (room === "Plenitude") {
      setPlenitudeEnemies([1, 2, 3, 4]);
      setScreen("room");
    } else if (room === "Adidas") {
      setAdidasTargets([1, 2, 3]);
      setScreen("adidasRoom");
    } else if (room === "Eni") {
      setScreen("eniRoom");
    } else if (room === "Lenovo") {
      setScreen("lenovoRoom");
    } else if (room === "La Rinascente") {
      setScreen("rinascenteRoom");
    } else if (room === "Lilt") {
      setScreen("liltRoom");
    } else if (room === "3D Stuff") {
      setScreen("threeDRoom");
    }
  };

  const playEnemyPop = () => {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      120,
      audioContext.currentTime + 0.12
    );

    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.12
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.12);
  };

  const createExplosion = (x: number, y: number, id: number) => {
    const explosionId = Date.now() + id;

    setExplosions((currentExplosions) => [
      ...currentExplosions,
      {
        id: explosionId,
        x,
        y,
      },
    ]);

    setTimeout(() => {
      setExplosions((currentExplosions) =>
        currentExplosions.filter((explosion) => explosion.id !== explosionId)
      );
    }, 650);
  };

  const hitPlenitudeEnemy = (
    enemy: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    playEnemyPop();

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    createExplosion(x, y, enemy);

    setPlenitudeEnemies((currentEnemies) =>
      currentEnemies.filter((item) => item !== enemy)
    );
  };

  const hitAdidasTarget = (
    target: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    playEnemyPop();

    const rect = event.currentTarget.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;
    const shotId = Date.now() + target;

    setBallShots((currentShots) => [
      ...currentShots,
      {
        id: shotId,
        x: targetX,
        y: targetY,
      },
    ]);

    setTimeout(() => {
      createExplosion(targetX, targetY, target);

      setAdidasTargets((currentTargets) =>
        currentTargets.filter((item) => item !== target)
      );
    }, 280);

    setTimeout(() => {
      setBallShots((currentShots) =>
        currentShots.filter((shot) => shot.id !== shotId)
      );
    }, 420);
  };

  return (
    <>
      {screen === "entrance" && (
        <main className="entrance">
          <div className="sky" />

          <div className="introCard">
            <h1>LINDA PUGNETTI</h1>
            <p className="role">Senior Art Director · Milan, Italy</p>
            <p className="contact">linda.pugnetti@gmail.com</p>
          </div>

          <div className="cherryTree leftTree">
            <div className="trunk" />
            <div className="crown crownOne" />
            <div className="crown crownTwo" />
            <div className="crown crownThree" />
          </div>

          <div className="cherryTree rightTree">
            <div className="trunk" />
            <div className="crown crownOne" />
            <div className="crown crownTwo" />
            <div className="crown crownThree" />
          </div>

          <div className="hillLayer backHill" />
          <div className="hillLayer midHill" />
          <div className="hillLayer frontHill" />

          <div className="gate">
            <div className="stonePillar leftPillar" />
            <div className="stonePillar rightPillar" />

            <div className="wallTorch leftWallTorch">
              <div className="flame" />
            </div>
            <div className="wallTorch rightWallTorch">
              <div className="flame" />
            </div>

            <div className="woodSign">
              <span>ENTER THE</span>
              <strong>PORTFOLIO</strong>
            </div>

            <button className="mainDoor" onClick={() => setScreen("lobby")}>
              <div className="doorBar top" />
              <div className="doorBar bottom" />
              <div className="doorSplit" />
              <div className="doorRing left" />
              <div className="doorRing right" />
            </button>
          </div>

          <div className="path" />

          <div className="floorLantern leftLantern">
            <div className="lanternLight" />
          </div>
          <div className="floorLantern rightLantern">
            <div className="lanternLight" />
          </div>

          <div className="grass grassLeft" />
          <div className="grass grassRight" />
          <div className="petals" />

          <button className="pressButton" onClick={() => setScreen("lobby")}>
            CLICK THE DOOR
          </button>
        </main>
      )}

      {screen === "lobby" && (
        <main className="lobby">
          <div className="lobbyPetals" />
          <div className="vines leftVines" />
          <div className="vines rightVines" />

          <div className="lobbyTorch leftTorch">
            <div className="flame" />
          </div>
          <div className="lobbyTorch rightTorch">
            <div className="flame" />
          </div>

          <div className="lobbySign">
            <span>SELECT A ROOM</span>
            <small>CHOOSE A WORLD TO ENTER</small>
          </div>

          <div className="roomDoors">
            {rooms.map((room) => (
              <button
                key={room}
                className={`roomDoor door-${room
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                onClick={() => enterRoom(room)}
              >
                <span>{room}</span>
                <div className="smallWindow" />
                <div className="smallHandle" />
              </button>
            ))}
          </div>

          <button
            className="backToEntrance"
            onClick={() => setScreen("entrance")}
          >
            ← BACK TO ENTRANCE
          </button>
        </main>
      )}

      {screen === "room" && (
        <main className="plenitudeRoom">
          <div className="plenitudePetals" />

          <div className="plenitudeVine leftPlenitudeVine" />
          <div className="plenitudeVine rightPlenitudeVine" />

          <div className="plenitudeTorch leftPlenitudeTorch">
            <div className="greenFlame" />
          </div>
          <div className="plenitudeTorch rightPlenitudeTorch">
            <div className="greenFlame" />
          </div>

          <div className="plenitudeSign">
            <span>PLENITUDE</span>
            <small>ENERGY & CONNECTION</small>
          </div>

          <div
            className={`plenitudeBattlePanel ${
              plenitudeIsLocked ? "" : "isCleared"
            }`}
          >
            <div className="battleMessage">
              {plenitudeIsLocked ? (
                <>
                  <span>⚔️ CLEAR THE ROOM</span>
                  <small>Elimina i nemici prima di aprire le porte</small>
                </>
              ) : (
                <>
                  <span>ROOM CLEARED</span>
                  <small>Ora puoi scegliere un progetto</small>
                </>
              )}
            </div>
          </div>

          {plenitudeIsLocked && (
            <div className="roamingEnemies">
              {plenitudeEnemies.map((enemy) => (
                <button
                  key={enemy}
                  className={`plenitudeEnemy roamingEnemy roamingEnemy-${enemy}`}
                  onClick={(event) => hitPlenitudeEnemy(enemy, event)}
                  aria-label="Elimina nemico"
                >
                  <span className="enemyEye leftEye" />
                  <span className="enemyEye rightEye" />
                  <span className="enemyMouth" />
                </button>
              ))}
            </div>
          )}

          <div className="explosionLayer" aria-hidden="true">
            {explosions.map((explosion) => (
              <div
                key={explosion.id}
                className="pixelExplosion"
                style={
                  {
                    "--explosion-x": `${explosion.x}px`,
                    "--explosion-y": `${explosion.y}px`,
                  } as CSSProperties
                }
              >
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={index} className={`pixelBit pixelBit-${index}`} />
                ))}
              </div>
            ))}
          </div>

          <div className="plenitudeDoors">
            {plenitudeProjects.map((project, index) => (
              <button
                key={project}
                className={`plenitudeProjectDoor plenitudeProjectDoor-${index} ${
                  plenitudeIsLocked ? "lockedDoor" : ""
                }`}
                disabled={plenitudeIsLocked}
                onClick={() => {
                  const links: Record<string, string> = {
                    "Campagna lancio fibra":
                      "https://www.behance.net/gallery/247162323/Plenitude-Lancio-Fibra",
                    "Design system":
                      "https://www.behance.net/gallery/247222055/PLENITUDE-The-Clay-Universe",
                    "Campagna 2024":
                      "https://www.behance.net/gallery/213320655/Plenitude-Diamo-Forma-Alle-Idee-Campaign",
                  };

                  window.open(links[project], "_blank");
                }}
              >
                <span>{project}</span>
                <div className="smallWindow" />
                <div className="smallHandle" />
              </button>
            ))}
          </div>

          <button className="backToLobby" onClick={() => setScreen("lobby")}>
            ← BACK TO LOBBY
          </button>
        </main>
      )}

      {screen === "adidasRoom" && (
        <main className="adidasRoom">
          <div className="adidasPetals" />

          <div className="adidasVine leftAdidasVine" />
          <div className="adidasVine rightAdidasVine" />

          <div className="adidasTorch leftAdidasTorch">
            <div className="whiteFlame" />
          </div>
          <div className="adidasTorch rightAdidasTorch">
            <div className="whiteFlame" />
          </div>

          <div className="adidasSign">
            <span>ADIDAS</span>
            <small>JUVENTUS KIT COLLECTION</small>
          </div>

          <div
            className={`adidasBattlePanel ${adidasIsLocked ? "" : "isCleared"}`}
          >
            {adidasIsLocked ? (
              <>
                <span>⚽ SCORE TO UNLOCK</span>
                <small>Colpisci tutti i target per aprire le porte</small>
              </>
            ) : (
              <>
                <span>GOAL!</span>
                <small>Ora puoi scegliere un kit</small>
              </>
            )}
          </div>

          {adidasIsLocked && (
            <div className="adidasTargets">
              {adidasTargets.map((target) => (
                <button
                  key={target}
                  className={`adidasTarget adidasTarget-${target}`}
                  onClick={(event) => hitAdidasTarget(target, event)}
                  aria-label="Colpisci target"
                />
              ))}
            </div>
          )}

          <div className="ballShotLayer" aria-hidden="true">
            {ballShots.map((shot) => (
              <div
                key={shot.id}
                className="pixelBallShot"
                style={
                  {
                    "--ball-target-x": `${shot.x}px`,
                    "--ball-target-y": `${shot.y}px`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div className="explosionLayer" aria-hidden="true">
            {explosions.map((explosion) => (
              <div
                key={explosion.id}
                className="pixelExplosion"
                style={
                  {
                    "--explosion-x": `${explosion.x}px`,
                    "--explosion-y": `${explosion.y}px`,
                  } as CSSProperties
                }
              >
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={index} className={`pixelBit pixelBit-${index}`} />
                ))}
              </div>
            ))}
          </div>

          <div className="adidasDoors">
            {adidasProjects.map((project, index) => (
              <button
                key={project}
                className={`adidasProjectDoor adidasProjectDoor-${index} ${
                  adidasIsLocked ? "lockedDoor" : ""
                }`}
                disabled={adidasIsLocked}
                onClick={() => {
                  const links: Record<string, string> = {
                    "Home kit":
                      "https://www.behance.net/gallery/217447097/Juventus-Home-kit-202223-Juventus-x-adidas",
                    "Away kit":
                      "https://www.behance.net/gallery/217578351/Juventus-Away-kit-202223-Juventus-x-adidas",
                    "Third kit":
                      "https://www.behance.net/gallery/218087057/Juventus-Third-kit-202223-Juventus-x-adidas",
                  };

                  window.open(links[project], "_blank");
                }}
              >
                <span>{project}</span>
                <div className="smallWindow" />
                <div className="smallHandle" />
              </button>
            ))}
          </div>

          <button className="backToLobby" onClick={() => setScreen("lobby")}>
            ← BACK TO LOBBY
          </button>
        </main>
      )}

      {screen === "eniRoom" && (
        <main className="eniRoom">
          <div className="eniParticles" />

          <div className="eniVines eniVinesLeft" />
          <div className="eniVines eniVinesRight" />
          <div className="eniVines eniVinesCenter" />

          <div className="eniTorch leftEniTorch">
            <div className="eniFlame" />
          </div>
          <div className="eniTorch rightEniTorch">
            <div className="eniFlame" />
          </div>

          <div className="eniSign">
            <span>ENI</span>
            <small>ANDARE AVANTI · SANREMO 2025</small>
          </div>

          <div className="eniDoors">
            <button
              className="eniProjectDoor"
              onClick={() =>
                window.open(
                  "https://www.behance.net/gallery/237957511/ENI-Andare-avanti-Sanremo-2025",
                  "_blank"
                )
              }
            >
              <span>ENI Sanremo 2025</span>
              <div className="smallWindow" />
              <div className="smallHandle" />
            </button>
          </div>

          <button className="backToLobby" onClick={() => setScreen("lobby")}>
            ← BACK TO LOBBY
          </button>
        </main>
      )}

      {screen === "lenovoRoom" && (
        <main className="lenovoRoom">
          <div className="lenovoParticles" />

          <div className="lenovoVines lenovoVinesLeft" />
          <div className="lenovoVines lenovoVinesRight" />

          <div className="lenovoTorch leftLenovoTorch">
            <div className="blueFlame" />
          </div>
          <div className="lenovoTorch rightLenovoTorch">
            <div className="blueFlame" />
          </div>

          <div className="lenovoSign">
            <span>LENOVO</span>
            <small>IT&apos;S GO TIME</small>
          </div>

          <div className="lenovoDoors">
            <button
              className="lenovoProjectDoor"
              onClick={() =>
                window.open(
                  "https://www.behance.net/gallery/211484453/Lenovo-Its-GO-Time",
                  "_blank"
                )
              }
            >
              <span>It&apos;s Go Time</span>
              <div className="smallWindow" />
              <div className="smallHandle" />
            </button>
          </div>

          <button className="backToLobby" onClick={() => setScreen("lobby")}>
            ← BACK TO LOBBY
          </button>
        </main>
      )}

      {screen === "threeDRoom" && (
        <main className="threeDRoom">
          <div className="threeDParticles" />

          <div className="threeDTorch leftThreeDTorch">
            <div className="purpleFlame" />
          </div>
          <div className="threeDTorch rightThreeDTorch">
            <div className="purpleFlame" />
          </div>

          <div className="threeDSign">
            <span>3D STUFF</span>
            <small>TOY DESIGN · CHARACTERS · EXPERIMENTS</small>
          </div>

          <div className="threeDWindows">
            {threeDProjects.map((project, index) => (
              <button
                key={project.name}
                className={`threeDWindow threeDWindow-${index}`}
                onClick={() => window.open(project.link, "_blank")}
              >
                <span>{project.name}</span>
                <small>{project.subtitle}</small>
                <div className="windowGlow" />
              </button>
            ))}
          </div>

          <button className="backToLobby" onClick={() => setScreen("lobby")}>
            ← BACK TO LOBBY
          </button>
        </main>
      )}

      {screen === "rinascenteRoom" && (
        <main className="rinascenteRoom">
          <div className="rinascenteParticles" />

          <div className="rinascenteCurtain leftRinascenteCurtain" />
          <div className="rinascenteCurtain rightRinascenteCurtain" />

          <div className="rinascenteTorch leftRinascenteTorch">
            <div className="pinkFlame" />
          </div>
          <div className="rinascenteTorch rightRinascenteTorch">
            <div className="pinkFlame" />
          </div>

          <div className="rinascenteSign">
            <span>LA RINASCENTE</span>
            <small>VISUAL CAMPAIGNS & SPECIAL PROJECTS</small>
          </div>

          <div className="rinascenteDoors">
            {rinascenteProjects.map((project, index) => (
              <button
                key={project}
                className={`rinascenteProjectDoor rinascenteProjectDoor-${index}`}
                onClick={() => {
                  const links: Record<string, string> = {
                    "Campagna 2026":
                      "https://www.behance.net/gallery/247216679/RINASCENTE-HAVE-A-GREAT-TIME-Visual-Campaign-2026",
                    "Diabolik - Colpo alla Rinascente":
                      "https://www.behance.net/gallery/193545591/Diabolik-Heist-at-Rinascente",
                  };

                  window.open(links[project], "_blank");
                }}
              >
                <span>{project}</span>
                <div className="smallWindow" />
                <div className="smallHandle" />
              </button>
            ))}
          </div>

          <button className="backToLobby" onClick={() => setScreen("lobby")}>
            ← BACK TO LOBBY
          </button>
        </main>
      )}

      {screen === "liltRoom" && (
        <main className="liltRoom">
          <div className="liltParticles" />

          <div className="liltVines leftLiltVines" />
          <div className="liltVines rightLiltVines" />

          <div className="liltTorch leftLiltTorch">
            <div className="yellowFlame" />
          </div>
          <div className="liltTorch rightLiltTorch">
            <div className="yellowFlame" />
          </div>

          <div className="liltSign">
            <span>LILT</span>
            <small>PREVENZIONE & CONSAPEVOLEZZA</small>
          </div>

          <div className="liltDoors">
            {liltProjects.map((project, index) => (
              <button
                key={project}
                className={`liltProjectDoor liltProjectDoor-${index}`}
                onClick={() => {
                  const links: Record<string, string> = {
                    "Fallo per la tua salute":
                      "https://www.behance.net/gallery/235530563/LILT-Fallo-per-la-tua-salute",
                    "Controllo palla":
                      "https://www.behance.net/gallery/193524723/LILT-La-miglior-difesa-parte-dal-controllo-palla",
                  };

                  window.open(links[project], "_blank");
                }}
              >
                <span>{project}</span>
                <div className="smallWindow" />
                <div className="smallHandle" />
              </button>
            ))}
          </div>

          <button className="backToLobby" onClick={() => setScreen("lobby")}>
            ← BACK TO LOBBY
          </button>
        </main>
      )}
    </>
  );
}
