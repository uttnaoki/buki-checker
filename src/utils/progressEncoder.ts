import { WEAPONS } from '@/data/weapons';

// Base64URL文字セット（URL安全な64進数）
const BASE64URL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * チェック済み武器IDのSetを短いBase64URL文字列にエンコード
 * 71ビット → 12文字
 */
export function encodeProgress(checkedIds: Set<string>): string {
  // 武器の順番に従って71ビットのバイナリを作成
  let binary = '';
  for (const weapon of WEAPONS) {
    binary += checkedIds.has(weapon.id) ? '1' : '0';
  }

  // バイナリ文字列をBigIntに変換
  const bigInt = BigInt('0b' + binary);

  // BigIntをBase64URLに変換
  let result = '';
  let remaining = bigInt;
  const base = BigInt(64);

  // 0の場合は'A'を返す
  if (remaining === BigInt(0)) {
    return 'A';
  }

  while (remaining > BigInt(0)) {
    const index = Number(remaining % base);
    result = BASE64URL_CHARS[index] + result;
    remaining = remaining / base;
  }

  return result;
}

/**
 * Base64URL文字列をチェック済み武器IDのSetにデコード
 */
export function decodeProgress(encoded: string): Set<string> {
  const checkedIds = new Set<string>();

  if (!encoded) {
    return checkedIds;
  }

  // Base64URLをBigIntに変換
  let bigInt = BigInt(0);
  const base = BigInt(64);

  for (const char of encoded) {
    const index = BASE64URL_CHARS.indexOf(char);
    if (index === -1) {
      // 無効な文字の場合は空のSetを返す
      return new Set<string>();
    }
    bigInt = bigInt * base + BigInt(index);
  }

  // BigIntを71ビットのバイナリに変換
  let binary = bigInt.toString(2);

  // 71桁になるよう先頭を0でパディング
  binary = binary.padStart(WEAPONS.length, '0');

  // 71桁を超えた場合は切り詰め（無効なエンコードの可能性）
  if (binary.length > WEAPONS.length) {
    binary = binary.slice(-WEAPONS.length);
  }

  // バイナリからチェック済み武器IDを復元
  for (let i = 0; i < WEAPONS.length; i++) {
    if (binary[i] === '1') {
      checkedIds.add(WEAPONS[i].id);
    }
  }

  return checkedIds;
}

/**
 * 進捗状態を含む共有URLを生成
 */
export function generateShareUrl(checkedIds: Set<string>): string {
  const encoded = encodeProgress(checkedIds);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/share?p=${encoded}`;
}
